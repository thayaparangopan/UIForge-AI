# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.project import Project
from app.schemas.project import ProjectCreate, ProjectResponse


router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]
)


@router.post("/", response_model=ProjectResponse)
def create_project(
    project_data: ProjectCreate,
    db: Session = Depends(get_db)
):
    name = project_data.project_name or project_data.title or "Untitled Project"
    fw = project_data.framework or "react-native"

    project = Project(
        project_name=name,
        framework=fw,
        title=project_data.title or name,
        description=project_data.description,
        status="created"
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project