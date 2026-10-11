import io
import os
import uuid
from pathlib import Path
from PIL import Image

# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.project import Project
from app.models.screenshot import Screenshot
from app.schemas.project import ProjectCreate, ProjectResponse
from app.schemas.screenshot import ScreenshotResponse


router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]
)

ALLOWED_MIME_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp"]
MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024  # 15 MB
UPLOAD_BASE_DIR = Path(__file__).resolve().parent.parent.parent / "uploads"
UPLOAD_BASE_DIR.mkdir(parents=True, exist_ok=True)


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


@router.get("/{id}", response_model=ProjectResponse)
def get_project(
    id: str,
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/{id}/upload", response_model=ScreenshotResponse)
async def upload_screenshot(
    id: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    content_type = (file.content_type or "").lower()
    if content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type '{content_type}'. Supported formats: PNG, JPG, JPEG, WebP"
        )

    content = await file.read()
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    if len(content) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=400,
            detail=f"File size exceeds the limit of {MAX_FILE_SIZE_BYTES // (1024 * 1024)}MB"
        )

    # Prepare project upload directory
    project_upload_dir = UPLOAD_BASE_DIR / id
    project_upload_dir.mkdir(parents=True, exist_ok=True)

    original_name = file.filename or "screenshot.png"
    safe_name = Path(original_name).name
    unique_filename = f"{uuid.uuid4().hex[:8]}_{safe_name}"
    file_path = project_upload_dir / unique_filename

    with open(file_path, "wb") as f:
        f.write(content)

    # Extract dimensions using Pillow
    width, height = None, None
    try:
        with Image.open(io.BytesIO(content)) as img:
            width, height = img.size
    except Exception:
        pass

    relative_url = f"/uploads/{id}/{unique_filename}"

    screenshot = Screenshot(
        project_id=project.id,
        file_name=original_name,
        file_path=str(file_path.as_posix()),
        file_size=len(content),
        file_type=content_type,
        width=width,
        height=height
    )

    project.status = "screenshot_uploaded"
    db.add(screenshot)
    db.commit()
    db.refresh(screenshot)

    return ScreenshotResponse(
        id=screenshot.id,
        project_id=screenshot.project_id,
        file_name=screenshot.file_name,
        file_path=screenshot.file_path,
        file_size=screenshot.file_size,
        file_type=screenshot.file_type,
        width=screenshot.width,
        height=screenshot.height,
        url=relative_url,
        created_at=screenshot.created_at
    )


@router.get("/{id}/screenshot", response_model=ScreenshotResponse)
def get_latest_screenshot(
    id: str,
    db: Session = Depends(get_db)
):
    project = db.query(Project).filter(Project.id == id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    screenshot = (
        db.query(Screenshot)
        .filter(Screenshot.project_id == id)
        .order_by(Screenshot.created_at.desc())
        .first()
    )

    if not screenshot:
        raise HTTPException(status_code=404, detail="No screenshot found for this project")

    unique_filename = Path(screenshot.file_path).name
    relative_url = f"/uploads/{id}/{unique_filename}"

    return ScreenshotResponse(
        id=screenshot.id,
        project_id=screenshot.project_id,
        file_name=screenshot.file_name,
        file_path=screenshot.file_path,
        file_size=screenshot.file_size,
        file_type=screenshot.file_type,
        width=screenshot.width,
        height=screenshot.height,
        url=relative_url,
        created_at=screenshot.created_at
    )