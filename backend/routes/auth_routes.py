from fastapi import APIRouter
from models.schemas import LoginRequest
from services.auth_service import login_service

router = APIRouter()


@router.post("/login")
def login(user: LoginRequest):
    return login_service(user)