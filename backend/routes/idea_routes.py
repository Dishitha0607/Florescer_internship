from fastapi import APIRouter, Query
from models.schemas import Idea, UpdateIdea

from services.idea_services import (
    create_idea_service,
    get_employee_ideas_service,
    update_idea_service,
    forward_idea_service
)

router = APIRouter()

@router.post("/addIdea")
def add_idea(idea: Idea):
    return create_idea_service(idea)


@router.get("/ideas")
def get_ideas(email: str = Query(...)):
    return get_employee_ideas_service(email)


@router.put("/updateIdea/{idea_id}")
def update_idea(idea_id: str, updated_idea: UpdateIdea):
    return update_idea_service(idea_id, updated_idea)


@router.put("/forwardIdea/{idea_id}")
def forward_idea(idea_id: str):
    return forward_idea_service(idea_id)