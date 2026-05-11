from pydantic import BaseModel


# =========================
# REQUEST MODELS
# =========================
class LoginRequest(BaseModel):
    email: str
    password: str

class Idea(BaseModel):
    classification: str
    budget: float
    subject: str
    details: str
    targetDate: str
    employeeEmail: str
    empName: str
    currentDate: str

class UpdateIdea(BaseModel):
    classification: str
    budget: float
    subject: str
    details: str
    targetDate: str
    empName: str

class ApproveIdea(BaseModel):
    rating : int


class ReviewIdea(BaseModel):
    rating : int
    feedback : str
