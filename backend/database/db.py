import mysql.connector

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