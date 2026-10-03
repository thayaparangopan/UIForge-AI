# pyrefly: ignore [missing-import]
from fastapi import FastAPI

from app.database.connection import Base, engine
from app.models.project import Project
from app.api.projects import router as project_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="UIForge AI API",
    description="Backend API for UIForge AI",
    version="1.0.0"
)


app.include_router(project_router)


@app.get("/")
def root():
    return {
        "message": "UIForge AI Backend is running"
    }