import os
from typing import Dict, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.screenshot import Screenshot
from app.models.project import Project
from app.schemas.comparison import (
    ComparisonRequest,
    ComparisonResult,
)
from app.services.comparison_service import run_visual_comparison

router = APIRouter(
    prefix="/api",
    tags=["Visual Comparison"]
)

# In-memory store for comparison results to support fetching by comparisonId
COMPARISON_CACHE: Dict[str, ComparisonResult] = {}


@router.post("/compare", response_model=ComparisonResult)
def compare_visuals_endpoint(
    payload: ComparisonRequest,
    db: Session = Depends(get_db)
):
    """
    Perform OpenCV & SSIM visual comparison between original screenshot and rendered output.
    Returns similarity scores, heatmap visual URL, and detected visual disparities.
    """
    upload_id = payload.upload_id or "upload_default"
    generation_id = payload.generation_id or "gen_default"

    original_img_path: Optional[str] = None
    uploads_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "uploads"))

    # Resolve original image if upload_id corresponds to a Screenshot
    screenshot = db.query(Screenshot).filter(Screenshot.id == upload_id).first()
    if screenshot and screenshot.file_path and os.path.exists(screenshot.file_path):
        original_img_path = screenshot.file_path
    elif screenshot and screenshot.file_name:
        candidate_path = os.path.join(uploads_dir, screenshot.file_name)
        if os.path.exists(candidate_path):
            original_img_path = candidate_path

    # If upload_id was actually a project_id, find the latest screenshot
    if not original_img_path:
        project_screenshot = db.query(Screenshot).filter(Screenshot.project_id == upload_id).order_by(Screenshot.created_at.desc()).first()
        if project_screenshot and project_screenshot.file_path and os.path.exists(project_screenshot.file_path):
            original_img_path = project_screenshot.file_path

    result = run_visual_comparison(
        upload_id=upload_id,
        generation_id=generation_id,
        original_img_path=original_img_path,
        uploads_dir=uploads_dir
    )

    COMPARISON_CACHE[result.comparison_id] = result
    return result


@router.get("/compare/{comparison_id}", response_model=ComparisonResult)
def get_comparison_by_id(comparison_id: str):
    """
    Retrieve an existing comparison result by its unique ID.
    """
    if comparison_id in COMPARISON_CACHE:
        return COMPARISON_CACHE[comparison_id]

    raise HTTPException(status_code=404, detail=f"Comparison result '{comparison_id}' not found.")
