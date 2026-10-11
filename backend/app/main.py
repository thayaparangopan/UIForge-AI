import os
# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from fastapi.staticfiles import StaticFiles

from app.database.connection import Base, engine
from app.models.project import Project
from app.models.screenshot import Screenshot
from app.api.projects import router as project_router


# Automatically create all database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="UIForge AI API",
    description="Backend API for UIForge AI",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure uploads directory exists and mount static files
uploads_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "uploads"))
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")

# Include API routes
app.include_router(project_router)


@app.get("/")
def root():
    return {
        "message": "UIForge AI Backend is running"
    }