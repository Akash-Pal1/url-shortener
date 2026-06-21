from pydantic import BaseModel, field_validator
from datetime import datetime, date
from typing import Optional

class URLCreate(BaseModel):
    original_url: str

    @field_validator("original_url")
    def type_must_be_valid(cls, v):
        if not (v.startswith("https://") or v.startswith("http://")):
            raise ValueError("url should contains valid credentials")
        return v
    
    class Config:
        from_attributes = True

class URL_Response(BaseModel):
    id : int 
    original_url: str 
    short_code: str
    created_at: datetime
    click_count: int

    class Config:
        from_attributes = True

class ClickResponse(BaseModel):
    id: int
    url_id: int
    clicked_at: datetime
    referrer: Optional[str]

    class Config:
        from_attributes = True

class AnalyticsResponse(BaseModel):
    date: str
    clicks: int

    
