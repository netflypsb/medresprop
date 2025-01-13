from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict
from .crew import ResearchCrew
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResearchRequest(BaseModel):
    description: str

class ProposalRequest(BaseModel):
    title: str
    background: str
    objectives: str

@app.post("/api/submit-research")
async def submit_research(request: ResearchRequest):
    try:
        # Initialize and run the research crew with predefined API keys
        crew = ResearchCrew()
        result = crew.run(request.description)
        
        return {
            "success": True,
            "review": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-proposal")
async def generate_proposal(request: ProposalRequest):
    try:
        crew = ResearchCrew()
        proposal = crew.generate_full_proposal(
            title=request.title,
            background=request.background,
            objectives=request.objectives
        )
        
        return {
            "success": True,
            "proposal": proposal
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 