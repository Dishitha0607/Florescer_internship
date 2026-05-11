from fastapi import APIRouter
from models.schemas import ReviewIdea
from services.admin_services import (
    dashboard_stats_service,
    get_admin_ideas_service,
    approve_idea_service,
    reject_idea_service,
    employee_stars_service,
    update_status_service
)

router = APIRouter()

@router.get("/dashboardStats")
def dashboard_stats():
    return dashboard_stats_service()


@router.get("/adminIdeas")
def get_admin_ideas():
    return get_admin_ideas_service()


@router.put("/approveIdea/{idea_id}")
def approve_idea(idea_id: str, data: ReviewIdea):
    return approve_idea_service(idea_id, data)


@router.put("/rejectIdea/{idea_id}")
def reject_idea(idea_id: str, data: ReviewIdea):
    return reject_idea_service(idea_id, data)


@router.get("/employeeStars")
def employee_stars():
    return employee_stars_service()


@router.put("/updateStatus/{idea_id}")
def update_status(idea_id: str, status: str):
    return update_status_service(idea_id, status)