from datetime import datetime
from pydantic import BaseModel, ConfigDict


class ScreenshotResponse(BaseModel):
    id: str
    project_id: str
    file_name: str
    file_path: str
    file_size: int
    file_type: str
    width: int | None = None
    height: int | None = None
    url: str
    created_at: datetime | None = None

    model_config = ConfigDict(from_attributes=True)
