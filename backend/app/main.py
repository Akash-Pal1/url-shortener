from fastapi import FastAPI, Depends, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from sqlalchemy import func, cast, Date
from typing import List
from app import models, schemas
from app.database import engine, get_db
from datetime import date, timedelta
import secrets
import string

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="URL Shortener API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "*"
    ],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate_short_code():
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for _ in range(6))

@app.get("/")
def root():
    return {"message": "URL Shortener API is running"}

@app.post("/shorten", response_model=schemas.URL_Response)
def shorten_url(url: schemas.URLCreate, db: Session = Depends(get_db)):
    generated_short_code = generate_short_code()
    # url_code = db.query(models.URL).filter(models.URL.short_code == generated_short_code).first()
    while db.query(models.URL).filter(models.URL.short_code == generated_short_code).first():
        generated_short_code = generate_short_code()

    new_url = models.URL(
        original_url = url.original_url,
        short_code = generated_short_code
    )
    db.add(new_url)
    db.commit()
    db.refresh(new_url)
    return new_url

@app.get("/urls", response_model=List[schemas.URL_Response])
def get_all_urls(db: Session = Depends(get_db)):
    all_urls = db.query(models.URL).all()
    return all_urls

@app.get("/{short_code}")
def redirect_url(short_code: str, request: Request, db: Session = Depends(get_db)):
    url = db.query(models.URL).filter(models.URL.short_code == short_code).first()
    if not url:
        raise HTTPException(status_code=404, detail="Short Code not found")
    new_click = models.Click(
        url_id = url.id,
        referrer = request.headers.get("referer")
    )
    db.add(new_click)
    url.click_count += 1
    db.commit()

    return RedirectResponse(url=url.original_url, status_code=307)

@app.get("/urls/{id}/analytics", response_model=List[schemas.AnalyticsResponse])
def get_analytics(id: int, db: Session = Depends(get_db)):

    url = db.query(models.URL).filter(models.URL.id == id).first()
    if not url:
        raise HTTPException(status_code=404, detail="URL not found")
    clicks_by_day = db.query(
        cast(models.Click.clicked_at, Date).label("date"),
        func.count(models.Click.id).label("clicks")
    ).filter(
        models.Click.url_id == id
    ).group_by(
        cast(models.Click.clicked_at, Date)
    ).order_by(
        cast(models.Click.clicked_at, Date)
    ).all()

    return [
        schemas.AnalyticsResponse(
            date=str(row.date),
            clicks=row.clicks
        )
        for row in clicks_by_day
    ]


@app.delete("/urls/{id}")
def delete_url(id: int, db: Session = Depends(get_db)):
    url = db.query(models.URL).filter(models.URL.id == id).first()
    if not url:
        raise HTTPException(status_code=404, detail="URL not found")
    db.delete(url)
    db.commit()
    return {"message": "URL deleted successfully"}

