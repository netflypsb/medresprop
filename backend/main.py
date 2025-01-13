from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from crewai import Crew, Agent, Task
from typing import Dict

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
    api_keys: Dict[str, str]

@app.post("/api/submit-research")
async def submit_research(request: ResearchRequest):
    try:
        # Initialize agents with API keys
        strategist = Agent(
            role="Research Strategist",
            goal="Plan and structure the literature review",
            backstory="Expert in research methodology and planning",
            allow_delegation=True,
            verbose=True,
            tools=["OpenRouter"]
        )
        
        searcher = Agent(
            role="Literature Searcher",
            goal="Find relevant academic papers and research",
            backstory="Experienced in academic database searching",
            allow_delegation=True,
            verbose=True,
            tools=["SERP", "Serper"]
        )
        
        synthesizer = Agent(
            role="Research Synthesizer",
            goal="Analyze and summarize research findings",
            backstory="Expert in research synthesis and analysis",
            allow_delegation=True,
            verbose=True,
            tools=["OpenRouter"]
        )

        # Create tasks
        tasks = [
            Task(
                description="Analyze research topic and create search strategy",
                agent=strategist
            ),
            Task(
                description="Conduct comprehensive literature search",
                agent=searcher
            ),
            Task(
                description="Synthesize findings into coherent review",
                agent=synthesizer
            )
        ]

        # Initialize and run crew
        crew = Crew(
            agents=[strategist, searcher, synthesizer],
            tasks=tasks,
            verbose=True
        )

        result = crew.kickoff()
        return {"success": True, "review": result}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 