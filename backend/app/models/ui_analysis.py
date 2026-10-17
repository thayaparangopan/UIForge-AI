import uuid
from datetime import datetime, timezone
# pyrefly: ignore [missing-import]
from sqlalchemy import Column, String, Integer, Float, DateTime, JSON, ForeignKey
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import relationship
from app.database.connection import Base


def generate_uuid():
    return str(uuid.uuid4())


class UIAnalysis(Base):
    __tablename__ = "ui_analyses"

    id = Column(String, primary_key=True, default=generate_uuid)
    project_id = Column(String, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    screenshot_id = Column(String, ForeignKey("screenshots.id", ondelete="SET NULL"), nullable=True)
    
    screen_name = Column(String, nullable=True, default="MainScreen")
    layout_type = Column(String, nullable=True, default="flex-column")
    intermediate_representation = Column(JSON, nullable=False)
    component_count = Column(Integer, default=0)
    confidence_score = Column(Float, default=95.0)
    processing_time_ms = Column(Integer, default=0)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    project = relationship("Project", back_populates="analyses")
    screenshot = relationship("Screenshot", back_populates="analyses")
