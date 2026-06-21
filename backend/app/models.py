from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, UniqueConstraint, Date
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base

class URL(Base):
    __tablename__ = "urls"

    id = Column(Integer, primary_key=True)
    original_url = Column(String, nullable=False)
    short_code = Column(String, nullable=False, unique=True)
    created_at = Column(DateTime, server_default=func.now())
    click_count = Column(Integer,default=0)
    clicks = relationship("Click",back_populates="url", cascade="all, delete-orphan")


class Click(Base):

    __tablename__ = "clicks"

    id = Column(Integer, primary_key=True)
    url_id = Column(Integer, ForeignKey("urls.id"), nullable=False)
    url = relationship("URL", back_populates="clicks")
    clicked_at = Column(DateTime, server_default=func.now())
    referrer = Column(String, nullable=True)

