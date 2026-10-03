from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ProjectCreate(BaseModel):
    project_name: str
    framework: str


class ProjectResponse(BaseModel):
    id: str
    project_name: str
    framework: str
    status: str
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)