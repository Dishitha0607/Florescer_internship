from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

import json

from routes.auth_routes import router as auth_router
from routes.idea_routes import router as idea_router
from routes.admin_routes import router as admin_router
from routes.kaizen_routes import router as kaizen_router

app = FastAPI()

# =========================
# STATIC
# =========================

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# ROUTERS
# =========================

app.include_router(auth_router)
app.include_router(idea_router)
app.include_router(admin_router)
app.include_router(kaizen_router)

# =========================
# MODEL
# =========================

class TeamMember(BaseModel):
    name: str
    email: str
    phone: str
    age: str
    access: str

# =========================
# HOME
# =========================

@app.get("/")
def home():
    return {
        "message": "API is running"
    }

# =========================
# GET TEAM
# =========================

@app.get("/team")
def get_team():

    with open("data/team.json", "r") as file:
        return json.load(file)

# =========================
# ADD TEAM MEMBER
# =========================

@app.post("/team")
def add_team_member(member: TeamMember):

    with open("data/team.json", "r") as file:
        data = json.load(file)

    new_member = {
        "id": len(data) + 1,
        "name": member.name,
        "email": member.email,
        "phone": member.phone,
        "age": member.age,
        "access": member.access,
    }

    data.append(new_member)

    with open("data/team.json", "w") as file:
        json.dump(data, file, indent=2)

    return {
        "message": "User added successfully",
        "user": new_member
    }

# =========================
# DELETE TEAM MEMBER
# =========================

@app.delete("/team/{id}")
def delete_team_member(id: int):

    with open("data/team.json", "r") as file:
        data = json.load(file)

    updated_data = [member for member in data if member["id"] != id]

    updated_data = [
        {**member, "id": index + 1}
        for index, member in enumerate(updated_data)
    ]

    with open("data/team.json", "w") as file:
        json.dump(updated_data, file, indent=2)

    return {
        "message": "Member deleted"
    }