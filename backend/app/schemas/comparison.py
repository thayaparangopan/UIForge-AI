from typing import Optional, List
from pydantic import BaseModel, Field, ConfigDict


class VisualDisparity(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    id: str
    component_id: Optional[str] = Field(None, alias="componentId")
    component_name: str = Field(..., alias="componentName")
    severity: str = Field(..., description="'low' | 'medium' | 'high'")
    category: str = Field(..., description="'layout' | 'color' | 'typography' | 'spacing'")
    description: str
    original_property: Optional[str] = Field(None, alias="originalProperty")
    generated_property: Optional[str] = Field(None, alias="generatedProperty")


class MetricBreakdown(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    ssim_score: float = Field(..., alias="ssimScore", description="SSIM similarity score 0-100")
    layout_match_score: float = Field(..., alias="layoutMatchScore", description="Layout match score 0-100")
    color_match_score: float = Field(..., alias="colorMatchScore", description="Color palette match score 0-100")
    typography_score: float = Field(..., alias="typographyScore", description="Typography score 0-100")
    overall_similarity: float = Field(..., alias="overallSimilarity", description="Weighted overall score 0-100")


class ComparisonRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    upload_id: Optional[str] = Field(None, alias="uploadId", description="Screenshot ID or project ID")
    generation_id: Optional[str] = Field(None, alias="generationId", description="Code generation ID")
    rendered_image_url: Optional[str] = Field(None, alias="renderedImageUrl", description="Optional URL to rendered preview")


class ComparisonResult(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    comparison_id: str = Field(..., alias="comparisonId")
    generation_id: str = Field(..., alias="generationId")
    upload_id: str = Field(..., alias="uploadId")
    original_image_url: str = Field(..., alias="originalImageUrl")
    rendered_preview_url: str = Field(..., alias="renderedPreviewUrl")
    diff_heatmap_url: str = Field(..., alias="diffHeatmapUrl")
    metrics: MetricBreakdown
    disparities: List[VisualDisparity] = []
    compared_at: str = Field(..., alias="comparedAt")
