from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routes.auth_routes import router as auth_router
from routes.idea_routes import router as idea_router
from routes.admin_routes import router as admin_router
from routes.kaizen_routes import router as kaizen_router

app = FastAPI()

app.include_router(idea_router)

# STATIC
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
# REQUIREMENTS
# =========================
app.include_router(auth_router)
app.include_router(idea_router)
app.include_router(admin_router)
app.include_router(kaizen_router)

# =========================
# HOME ROUTE
# =========================
@app.get("/")
def home():
    return {
        "message": "API is running"
    }
