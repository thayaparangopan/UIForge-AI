from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ProjectCreate(BaseModel):
    project_name: str | None = None
    framework: str | None = "react-native"
    title: str | None = None
    description: str | None = None


class ProjectResponse(BaseModel):
    id: str
    project_name: str
    framework: str
    title: str | None = None
    description: str | None = None
    status: str
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)