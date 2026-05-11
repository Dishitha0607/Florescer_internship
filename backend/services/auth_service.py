from passlib.context import CryptContext
from fastapi import HTTPException

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

# TEMP USERS (later replace with DB)
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
# LOGIN SERVICE
# =========================
def login_service(user):

    for u in users_db:

        if (
            u["email"] == user.email
            and pwd_context.verify(user.password, u["password"])
        ):
            return {"role": u["role"]}

    raise HTTPException(
        status_code=401,
        detail="Invalid credentials"
    )