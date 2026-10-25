import os
# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
# pyrefly: ignore [missing-import]
from fastapi.staticfiles import StaticFiles

from app.database.connection import Base, engine
from app.models import Project, Screenshot, UIAnalysis
from app.api.projects import router as project_router
from app.api.generation import router as generation_router
from app.api.comparison import router as comparison_router
from app.api.refinement import router as refinement_router


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
app.include_router(generation_router)
app.include_router(comparison_router)
app.include_router(refinement_router)


@app.get("/")
def root():
    return {
        "message": "UIForge AI Backend is running"
    }