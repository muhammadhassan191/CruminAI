import os
from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel
from typing import Optional
from dotenv import load_dotenv
from scraper import run_lead_scraper
from email_service import send_outreach_email
import httpx

load_dotenv()

app = FastAPI(title="CruminAI Lead Enrichment & Outreach Service")

class ScrapeRequest(BaseModel):
    industry: str
    location: str
    title: Optional[str] = None
    employee_count: Optional[str] = None
    limit: int = 15

class EmailRequest(BaseModel):
    recipient_email: str
    subject: str
    body: str

@app.post("/scrape")
async def trigger_scrape(request: ScrapeRequest, background_tasks: BackgroundTasks):
    background_tasks.add_task(run_lead_scraper, request.keyword, request.location, request.limit)
    return {"message": "Scraping task started in background", "keyword": request.keyword}

@app.post("/send-email")
async def trigger_email(request: EmailRequest):
    success = await send_outreach_email(request.recipient_email, request.subject, request.body)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to send email")
    return {"message": "Email sent successfully"}

@app.get("/enrich/{lead_id}")
async def enrich_lead(lead_id: str):
    # This would call Apollo/Lusha API in a real scenario
    # For now, we'll demonstrate a proxy call to a mock or real service
    apollo_api_key = os.getenv("APOLLO_API_KEY")
    if not apollo_api_key:
        return {"error": "Apollo API key not configured", "status": "mocked"}
    
    # Example logic for Apollo API
    async with httpx.AsyncClient() as client:
        # response = await client.post("https://api.apollo.io/v1/people/match", ...)
        # return response.json()
        return {"message": "Enrichment successful (mocked for demo)", "lead_id": lead_id}

@app.get("/")
def read_root():
    return {"status": "CruminAI Microservice Running"}
