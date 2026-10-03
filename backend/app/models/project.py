import uuid
from datetime import datetime, timezone
# pyrefly: ignore [missing-import]
from sqlalchemy import Column, String, Text, DateTime, JSON
from app.database.connection import Base


def generate_uuid():
    return str(uuid.uuid4())


class Project(Base):
    __tablename__ = "projects"

    id = Column(String, primary_key=True, default=generate_uuid)
    project_name = Column(String, nullable=False, default="Untitled Project")
    framework = Column(String, nullable=False, default="React")
    title = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    status = Column(String, default="created")
    config = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
