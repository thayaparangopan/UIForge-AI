import os
import logging
# pyrefly: ignore [missing-import]
from dotenv import load_dotenv
# pyrefly: ignore [missing-import]
from sqlalchemy import create_engine
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import sessionmaker, declarative_base

logger = logging.getLogger(__name__)

# Only load .env if not explicitly running tests
if os.getenv("TESTING") != "1":
    load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./uiforge.db")

# In testing mode, default to SQLite in-memory unless specified
if os.getenv("TESTING") == "1" and not os.getenv("DATABASE_URL"):
    DATABASE_URL = "sqlite:///:memory:"

# Fix dialect for psycopg2 if specified as postgresql://
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://", 1)

if "sqlite" in DATABASE_URL:
    connect_args = {"check_same_thread": False}
else:
    # 1 second connect_timeout for Postgres prevents hangs when local PG server is down
    connect_args = {"connect_timeout": 1}

try:
    engine = create_engine(DATABASE_URL, connect_args=connect_args)
    # If using PostgreSQL, perform a fast 1-second connection probe
    if not DATABASE_URL.startswith("sqlite"):
        with engine.connect() as conn:
            pass
except Exception as e:
    logger.warning(
        f"Unable to connect to primary database ({DATABASE_URL}): {e}. Falling back to SQLite (sqlite:///./uiforge.db)."
    )
    DATABASE_URL = "sqlite:///./uiforge.db"
    connect_args = {"check_same_thread": False}
    engine = create_engine(DATABASE_URL, connect_args=connect_args)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
