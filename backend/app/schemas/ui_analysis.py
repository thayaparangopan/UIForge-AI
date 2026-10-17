from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class BoundingBox(BaseModel):
    x: float = 0
    y: float = 0
    width: float = 0
    height: float = 0


class ComponentStyle(BaseModel):
    backgroundColor: Optional[str] = None
    textColor: Optional[str] = None
    fontSize: Optional[float] = None
    borderRadius: Optional[float] = None


class UIComponentIR(BaseModel):
    id: str
    type: str = "container"
    label: Optional[str] = None
    placeholder: Optional[str] = None
    bounding_box: Optional[BoundingBox] = None
    style: Optional[ComponentStyle] = None
    children: Optional[List["UIComponentIR"]] = None


class ColorPalette(BaseModel):
    primary: Optional[str] = "#0284C7"
    secondary: Optional[str] = "#10B981"
    background: Optional[str] = "#FFFFFF"
    textPrimary: Optional[str] = "#0F172A"
    textSecondary: Optional[str] = "#64748B"


class Typography(BaseModel):
    fontFamily: Optional[str] = "Inter"
    baseFontSize: Optional[int] = 16


class Dimensions(BaseModel):
    width: Optional[int] = None
    height: Optional[int] = None


class UIIntermediateRepresentation(BaseModel):
    screenName: Optional[str] = "MainScreen"
    layoutType: Optional[str] = "flex-column"
    dimensions: Optional[Dimensions] = None
    colorPalette: Optional[ColorPalette] = None
    typography: Optional[Typography] = None
    components: List[UIComponentIR] = Field(default_factory=list)


class AnalysisRequest(BaseModel):
    screenshot_id: Optional[str] = None


class AnalysisResponse(BaseModel):
    id: str
    project_id: str
    screenshot_id: Optional[str] = None
    screen_name: Optional[str] = None
    layout_type: Optional[str] = None
    intermediate_representation: Dict[str, Any]
    component_count: int = 0
    confidence_score: float = 95.0
    processing_time_ms: int = 0
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
