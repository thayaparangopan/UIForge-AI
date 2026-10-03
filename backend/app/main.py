# pyrefly: ignore [missing-import]
from fastapi import FastAPI

app = FastAPI(
    title="UIForge AI API",
    description="Backend API for UIForge AI",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "message": "UIForge AI Backend is running"
    }