from typing import List, Optional, Dict, Any, Literal
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict, computed_field
from app.schemas.ui_analysis import UIIntermediateRepresentation


class CodeFileSchema(BaseModel):
    path: str
    name: str
    type: Literal["tsx", "ts", "json", "png", "svg", "dart"]
    sizeBytes: int
    content: str


class GenerationMetricsSchema(BaseModel):
    astDepth: int = 4
    deduplicationRate: float = 95.0
    accessibilityScore: int = 100
    compilationStatus: Literal["success", "warning", "error"] = "success"


class GenerationManifestSchema(BaseModel):
    totalFiles: int
    bundleSizeBytes: int
    zipDownloadUrl: str


class CodeGenerationRequest(BaseModel):
    analysis_id: Optional[str] = Field(None, alias="analysisId")
    framework: Optional[str] = "react-native"
    intermediate_representation: Optional[Dict[str, Any]] = Field(None, alias="intermediateRepresentation")

    model_config = ConfigDict(populate_by_name=True)


class CodeGenerationResponse(BaseModel):
    generation_id: str = Field(..., alias="generationId")
    analysis_id: str = Field(..., alias="analysisId")
    framework: str
    files: List[CodeFileSchema]
    manifest: GenerationManifestSchema
    metrics: GenerationMetricsSchema
    generated_at: str = Field(..., alias="generatedAt")

    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
