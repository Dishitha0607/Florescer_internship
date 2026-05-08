from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from passlib.context import CryptContext
import mysql.connector
import random

app = FastAPI()

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
# MYSQL CONNECTION FUNCTION
# =========================
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="emp_ideas"
    )

# =========================
# PASSWORD HASHING
# =========================
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# =========================
# TEMP USERS
# =========================
users_db = [
    {
        "email": "admin@test.com",
        "username": "admin_123",
        "password": pwd_context.hash("5678"),
        "role": "admin"
    },
    {
        "email": "emp@test.com",
        "username": "employee_dash",
        "password": pwd_context.hash("1234"),
        "role": "employee"
    }
]

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

# =========================
# HOME ROUTE
# =========================
@app.get("/")
def home():
    return {
        "message": "API is running"
    }

# =========================
# LOGIN
# =========================
@app.post("/login")
def login(user: LoginRequest):

    for u in users_db:

        if (
            u["email"] == user.email
            and pwd_context.verify(
                user.password,
                u["password"]
            )
        ):

            return {
                "role": u["role"]
            }

    raise HTTPException(
        status_code=401,
        detail="Invalid credentials"
    )

# =========================
# ADD IDEA
# =========================
@app.post("/addIdea")
def add_idea(idea: Idea):

    try:
        db = get_db_connection()

        cursor = db.cursor()

        idea_id = "IDEA-" + str(
            random.randint(1000, 9999)
        )

        query = """
        INSERT INTO ideas1
        (
            idea_id,
            emp_email,
            emp_name,
            classification,
            budget,
            subject,
            details,
            target_date,
            status,
            created_at
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
        """

        values = (
            idea_id,
            idea.employeeEmail,
            idea.empName,
            idea.classification,
            idea.budget,
            idea.subject,
            idea.details,
            idea.targetDate,
            "Pending",
            idea.currentDate
        )

        cursor.execute(query, values)

        db.commit()

        cursor.close()
        db.close()

        return {
            "message": "Idea Submitted Successfully"
        }

    except Exception as e:

        print("ERROR /addIdea:", e)

        return {
            "error": str(e)
        }

# =========================
# GET EMPLOYEE IDEAS
# =========================
@app.get("/ideas")
def get_ideas(email: str = Query(...)):

    try:
        db = get_db_connection()

        cursor = db.cursor(dictionary=True)

        query = """
        SELECT * FROM ideas1
        WHERE emp_email = %s
        ORDER BY id DESC
        """

        cursor.execute(query, (email,))

        ideas = cursor.fetchall()

        cursor.close()
        db.close()

        return ideas

    except Exception as e:

        print("ERROR /ideas:", e)

        return []

# =========================
# DASHBOARD STATS
# =========================
@app.get("/dashboardStats")
def dashboard_stats():

    try:
        db = get_db_connection()

        cursor = db.cursor(dictionary=True)

        # TOTAL
        cursor.execute(
            "SELECT COUNT(*) as count FROM ideas1"
        )

        total = cursor.fetchone()["count"]

        # PENDING
        cursor.execute(
            """
            SELECT COUNT(*) as count
            FROM ideas1
            WHERE status='Pending'
            """
        )

        pending = cursor.fetchone()["count"]

        # ACCEPTED
        cursor.execute(
            """
            SELECT COUNT(*) as count
            FROM ideas1
            WHERE status='Accepted'
            """
        )

        accepted = cursor.fetchone()["count"]

        # Forwarded
        cursor.execute(
            """
            SELECT COUNT(*) as count
            FROM ideas1
            WHERE status='Forwarded'
            """
        )

        forwarded = cursor.fetchone()["count"]

        cursor.close()
        db.close()

        return {
            "total": total,
            "pending": pending,
            "accepted": accepted,
            "forwarded": forwarded
        }

    except Exception as e:

        print("ERROR /dashboardStats:", e)

        return {
            "total": 0,
            "pending": 0,
            "accepted": 0,
            "forwarded": 0
        }

# =========================
# UPDATE STATUS
# =========================
@app.put("/updateStatus/{idea_id}")
def update_status(
    idea_id: str,
    status: str
):

    try:
        db = get_db_connection()

        cursor = db.cursor()

        query = """
        UPDATE ideas1
        SET status=%s
        WHERE idea_id=%s
        """

        cursor.execute(
            query,
            (status, idea_id)
        )

        db.commit()

        cursor.close()
        db.close()

        return {
            "message": "Status updated"
        }

    except Exception as e:

        print("ERROR /updateStatus:", e)

        return {
            "error": str(e)
        }

# ===============================
# EDITING OPTION - VIEW IN DETAIL
# ===============================

@app.put("/updateIdea/{idea_id}")
def update_idea(idea_id: str, updated_idea: UpdateIdea):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = """
        UPDATE ideas1
        SET
            classification=%s,
            budget=%s,
            subject=%s,
            details=%s,
            target_date=%s,
            emp_name=%s
        WHERE idea_id=%s
        """

        values = (
            updated_idea.classification,
            updated_idea.budget,
            updated_idea.subject,
            updated_idea.details,
            updated_idea.targetDate,
            updated_idea.empName,
            idea_id
        )

        # added
        print(idea_id)
        print(updated_idea.subject)

        cursor.execute(query,values)

        #added
        print(cursor.rowcount)

        db.commit()
        cursor.close()
        db.close()

        return{
            "message" : "Idea updated successfully"
        }
    except Exception as e :
        print("ERROR /updat eIdea",e)
        return{
            "error" : str(e)
        }
    
@app.put("/forwardIdea/{idea_id}")
def forward_idea(idea_id:str):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = """
        UPDATE ideas1
        SET status=%s
        WHERE idea_id=%s        
        """

        cursor.execute(query , ("Forwarded" , idea_id))

        db.commit()
        cursor.close()
        db.close()

        return{
            "message" : "Idea forwarded to Admin"
        }
    
    except Exception as e:
        print("ERROR /forwardIdea:",e)
        return {
            "error":str(e)
        }

# =========================
# GET ADMIN IDEAS
# =========================
@app.get("/adminIdeas")
def get_admin_ideas():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        query = """
        SELECT * FROM ideas1
        WHERE status IN ("Forwarded", "Accepted", "Rejected")
        ORDER BY id desc
        """

        cursor.execute(query)
        ideas = cursor.fetchall() #Gets matching status are stores it here
        cursor.close()
        db.close()
        return ideas
    
    except Exception as e:
        print("ERROR /adminIdeas:",e)
        return []

# =========================
# APPROVE IDEA
# =========================
@app.put("/approveIdea/{idea_id}")
def approve_idea(idea_id:str):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = """
        UPDATE ideas1
        SET status=%s
        WHERE idea_id=%s
        """

        cursor.execute(query , ("Accepted" , idea_id))
        db.commit()
        cursor.close()
        db.close()

        return{
            "message" : "Idea Approved"
        }
    
    except Exception as e:
        print("ERROR /approveIdea:" , e)

        return {
            "error" : str(e)
        }
    
# =========================
# REJECT IDEA
# =========================
# =========================
# REJECT IDEA
# =========================
@app.put("/rejectIdea/{idea_id}")
def reject_idea(idea_id:str):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = """
        UPDATE ideas1
        SET status=%s
        WHERE idea_id=%s
        """

        cursor.execute(query, ("Rejected", idea_id))

        db.commit()

        cursor.close()
        db.close()

        return {
            "message": "Idea Rejected"
        }

    except Exception as e:
        print("ERROR /rejectIdea:", e)

        return {
            "error": str(e)
        }
    