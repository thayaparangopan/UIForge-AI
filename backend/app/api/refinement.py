from typing import Optional
from fastapi import APIRouter, HTTPException

from app.schemas.refinement import (
    SubmitRefinementPayload,
    RefinementResult,
)
from app.services.refinement_service import (
    refine_code_with_prompt,
    get_refinement_history_by_id,
)
from app.api.generation import GENERATION_CACHE

router = APIRouter(
    prefix="/api",
    tags=["Code Refinement"]
)


@router.post("/refine", response_model=RefinementResult)
def refine_code_endpoint(payload: SubmitRefinementPayload):
    """
    Submit natural language instruction to iterate and modify generated frontend code.
    Maintains a versioned timeline, logs prompts, and updates quality metrics.
    """
    if not payload.prompt_text or not payload.prompt_text.strip():
        raise HTTPException(status_code=400, detail="Prompt text cannot be empty.")

    # Retrieve existing generation files if cached
    existing_files = None
    if payload.generation_id in GENERATION_CACHE:
        gen_data = GENERATION_CACHE[payload.generation_id]
        if hasattr(gen_data, "files"):
            existing_files = [f.model_dump() for f in gen_data.files]
        elif isinstance(gen_data, dict) and "files" in gen_data:
            existing_files = gen_data["files"]

    result = refine_code_with_prompt(
        payload=payload,
        existing_generation_files=existing_files
    )
    return result


@router.get("/refine/history/{generation_id}", response_model=RefinementResult)
def get_refinement_history_endpoint(generation_id: str):
    """
    Retrieve the iterative refinement history, version logs, and latest updated files for a generation ID.
    """
    result = get_refinement_history_by_id(generation_id)
    if result:
        return result

    # Return initial default version state rather than 404 for smooth frontend experience
    payload = SubmitRefinementPayload(
        generationId=generation_id,
        promptText="Initial generated state"
    )
    return refine_code_with_prompt(payload)
