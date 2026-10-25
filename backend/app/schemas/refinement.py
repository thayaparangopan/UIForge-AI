from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict
from app.schemas.code_generation import CodeFileSchema
from app.schemas.comparison import MetricBreakdown


class RefinementPromptSchema(BaseModel):
    id: str
    prompt_text: str = Field(..., alias="promptText")
    timestamp: str
    status: str = "applied"  # "pending" | "processing" | "applied" | "rejected"

    model_config = ConfigDict(populate_by_name=True)


class RefinementVersionSchema(BaseModel):
    version_number: int = Field(..., alias="versionNumber")
    prompt_used: str = Field(..., alias="promptUsed")
    applied_changes: List[str] = Field(..., alias="appliedChanges")
    updated_files: List[CodeFileSchema] = Field(..., alias="updatedFiles")
    new_metrics: MetricBreakdown = Field(..., alias="newMetrics")
    created_time: str = Field(..., alias="createdTime")

    model_config = ConfigDict(populate_by_name=True)


class SubmitRefinementPayload(BaseModel):
    generation_id: str = Field(..., alias="generationId")
    prompt_text: str = Field(..., alias="promptText")
    target_component_id: Optional[str] = Field(None, alias="targetComponentId")

    model_config = ConfigDict(populate_by_name=True)


class RefinementResult(BaseModel):
    refinement_id: str = Field(..., alias="refinementId")
    generation_id: str = Field(..., alias="generationId")
    current_version: int = Field(..., alias="currentVersion")
    history: List[RefinementVersionSchema] = []
    prompt_logs: List[RefinementPromptSchema] = Field([], alias="promptLogs")
    latest_updated_files: List[CodeFileSchema] = Field([], alias="latestUpdatedFiles")
    updated_at: str = Field(..., alias="updatedAt")

    model_config = ConfigDict(populate_by_name=True)
