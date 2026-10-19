import os
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.project import Project
from app.models.ui_analysis import UIAnalysis
from app.schemas.code_generation import (
    CodeGenerationRequest,
    CodeGenerationResponse,
)
from app.services.code_gen_service import generate_code_from_ir, create_zip_bundle

router = APIRouter(
    prefix="/api",
    tags=["Code Generation"]
)

# In-memory storage for generation results to support zip downloads and retrieval by generationId
GENERATION_CACHE = {}


@router.post("/generate", response_model=CodeGenerationResponse)
def generate_code_endpoint(
    request: CodeGenerationRequest,
    db: Session = Depends(get_db)
):
    """
    Generate clean, modular code components from UI Intermediate Representation or analysis ID.
    Supports React Native, React JS, and Flutter frameworks.
    """
    ir = request.intermediate_representation
    analysis_id = request.analysis_id
    framework = request.framework or "react-native"

    # If IR was not provided directly in payload, lookup by analysis_id
    if not ir and analysis_id:
        analysis = db.query(UIAnalysis).filter(UIAnalysis.id == analysis_id).first()
        if analysis and analysis.intermediate_representation:
            ir = analysis.intermediate_representation
            # If project has a specific framework, fallback to project framework
            if not request.framework and analysis.project_id:
                project = db.query(Project).filter(Project.id == analysis.project_id).first()
                if project and project.framework:
                    framework = project.framework

    if not ir:
        raise HTTPException(
            status_code=400,
            detail="Either intermediateRepresentation or a valid analysisId must be provided."
        )

    result = generate_code_from_ir(
        intermediate_representation=ir,
        framework=framework,
        analysis_id=analysis_id
    )

    # Cache result for bundle download
    GENERATION_CACHE[result["generationId"]] = result

    # Also update project status if linked
    if analysis_id:
        analysis = db.query(UIAnalysis).filter(UIAnalysis.id == analysis_id).first()
        if analysis and analysis.project_id:
            project = db.query(Project).filter(Project.id == analysis.project_id).first()
            if project:
                project.status = "code_generated"
                db.commit()

    return result


@router.post("/projects/{id}/generate", response_model=CodeGenerationResponse)
def generate_project_code_endpoint(
    id: str,
    request: Optional[CodeGenerationRequest] = None,
    db: Session = Depends(get_db)
):
    """
    Generate code directly for a specific project using its latest UI Analysis.
    """
    project = db.query(Project).filter(Project.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    framework = (request.framework if request and request.framework else None) or project.framework or "react-native"

    # Find latest analysis for this project
    analysis = (
        db.query(UIAnalysis)
        .filter(UIAnalysis.project_id == id)
        .order_by(UIAnalysis.created_at.desc())
        .first()
    )

    ir = None
    if request and request.intermediate_representation:
        ir = request.intermediate_representation
    elif analysis and analysis.intermediate_representation:
        ir = analysis.intermediate_representation

    if not ir:
        raise HTTPException(
            status_code=400,
            detail="No UI Analysis available for this project. Please analyze a screenshot first."
        )

    result = generate_code_from_ir(
        intermediate_representation=ir,
        framework=framework,
        analysis_id=analysis.id if analysis else None
    )

    GENERATION_CACHE[result["generationId"]] = result
    project.status = "code_generated"
    db.commit()

    return result


@router.get("/generate/{generation_id}", response_model=CodeGenerationResponse)
def get_generation_by_id(generation_id: str):
    """
    Retrieve cached code generation result by generation ID.
    """
    if generation_id not in GENERATION_CACHE:
        raise HTTPException(status_code=404, detail=f"Generation '{generation_id}' not found.")
    return GENERATION_CACHE[generation_id]


@router.get("/download/{generation_id}")
@router.get("/download/{generation_id}.zip")
def download_code_bundle(generation_id: str):
    """
    Download a ZIP bundle containing all generated code files.
    """
    # Clean possible .zip extension
    clean_id = generation_id.replace(".zip", "")
    gen_result = GENERATION_CACHE.get(clean_id)
    if not gen_result:
        raise HTTPException(status_code=404, detail="Code bundle not found or expired.")

    zip_bytes = create_zip_bundle(gen_result.get("files", []))
    filename = f"uiforge_{gen_result.get('framework', 'code')}_{clean_id}.zip"

    return Response(
        content=zip_bytes,
        media_type="application/zip",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'}
    )
