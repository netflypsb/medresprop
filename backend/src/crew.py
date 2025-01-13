from typing import Dict
from crewai import Agent, Task, Crew
import yaml
import os
from dotenv import load_dotenv
from dataclasses import dataclass

load_dotenv()

@dataclass
class ProposalSection:
    title: str
    abstract: str
    introduction: str
    hypotheses: str
    literature_review: str
    methodology: dict
    ethics: str
    timeline: str
    budget: dict
    expected_outcomes: str
    impact: str
    references: str

class ResearchCrew:
    def __init__(self):
        self.api_keys = {
            'openRouter': os.getenv('OPENROUTER_API_KEY'),
            'serp': os.getenv('SERP_API_KEY'),
            'serper': os.getenv('SERPER_API_KEY')
        }
        self.load_config()
        
    def load_config(self):
        """Load configuration from YAML files"""
        with open('config/agents.yaml', 'r') as f:
            self.agents_config = yaml.safe_load(f)
        with open('config/tasks.yaml', 'r') as f:
            self.tasks_config = yaml.safe_load(f)

    def create_agents(self):
        """Create agents from configuration"""
        agents = {}
        for name, config in self.agents_config.items():
            agents[name] = Agent(
                role=config['role'],
                goal=config['goal'],
                backstory=config['backstory'],
                tools=config.get('tools', []),
                allow_delegation=config.get('allow_delegation', True),
                verbose=config.get('verbose', True)
            )
        return agents

    def create_tasks(self, research_description: str, agents: Dict[str, Agent]):
        """Create tasks for the research process"""
        tasks = []
        
        # Analysis task
        tasks.append(Task(
            description=f"Analyze this research topic and create a search strategy: {research_description}",
            agent=agents['research_strategist']
        ))
        
        # Search task
        tasks.append(Task(
            description="Using the search strategy, find relevant academic papers and research",
            agent=agents['literature_searcher']
        ))
        
        # Synthesis task
        tasks.append(Task(
            description="Create a comprehensive literature review from the collected materials",
            agent=agents['review_synthesizer']
        ))
        
        return tasks

    def generate_full_proposal(self, title: str, background: str, objectives: str) -> ProposalSection:
        """Generate a complete research proposal"""
        agents = self.create_agents()
        tasks = self.create_proposal_tasks(title, background, objectives, agents)
        
        crew = Crew(
            agents=list(agents.values()),
            tasks=tasks,
            verbose=True
        )
        
        results = crew.kickoff()
        
        # Parse results into structured proposal
        return ProposalSection(
            title=title,
            abstract=results['abstract'],
            introduction=results['introduction'],
            hypotheses=results['hypotheses'],
            literature_review=results['literature_review'],
            methodology={
                'study_design': results['methodology']['study_design'],
                'population': results['methodology']['population'],
                'data_collection': results['methodology']['data_collection'],
                'statistical_analysis': results['methodology']['statistical_analysis']
            },
            ethics=results['ethics'],
            timeline=results['timeline'],
            budget={
                'personnel': results['budget']['personnel'],
                'equipment': results['budget']['equipment'],
                'other': results['budget']['other'],
                'total': results['budget']['total']
            },
            expected_outcomes=results['expected_outcomes'],
            impact=results['impact'],
            references=results['references']
        )

    def create_proposal_tasks(self, title: str, background: str, objectives: str, agents: Dict[str, Agent]) -> list[Task]:
        """Create tasks for generating a complete proposal"""
        return [
            Task(
                description=f"Analyze research topic and develop hypotheses for: {title}\nBackground: {background}\nObjectives: {objectives}",
                agent=agents['research_strategist']
            ),
            Task(
                description="Conduct comprehensive literature review based on research questions",
                agent=agents['literature_searcher']
            ),
            Task(
                description="Design detailed methodology and statistical approach",
                agent=agents['methodology_expert']
            ),
            Task(
                description="Develop ethical considerations and compliance framework",
                agent=agents['ethics_advisor']
            ),
            Task(
                description="Create detailed budget and timeline",
                agent=agents['budget_planner']
            ),
            Task(
                description="Analyze potential impact and expected outcomes",
                agent=agents['impact_analyst']
            ),
            Task(
                description="Write complete research proposal",
                agent=agents['proposal_writer']
            )
        ]

    def run(self, research_description: str):
        """Execute the research process"""
        agents = self.create_agents()
        tasks = self.create_tasks(research_description, agents)
        
        crew = Crew(
            agents=list(agents.values()),
            tasks=tasks,
            verbose=True
        )
        
        result = crew.kickoff()
        return result 