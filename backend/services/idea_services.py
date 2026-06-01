from database.db import get_db_connection
import random

# =========================
# EMPLOYEE STATS
# =========================
def employee_stats_service(email):

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    query = """
    SELECT
        COUNT(*) AS total,
        SUM(status = 'Pending') AS pending,
        SUM(status = 'Accepted') AS accepted,
        SUM(status = 'Forwarded') AS forwarded
    FROM ideas1
    WHERE emp_email = %s
    """

    cursor.execute(query, (email,))
    result = cursor.fetchone()

    cursor.close()
    db.close()

    return result

# =========================
# CREATE IDEA
# =========================
def create_idea_service(idea):

    db = get_db_connection()
    cursor = db.cursor()

    idea_id = "IDEA-" + str(random.randint(1000, 9999))

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

# =========================
# GET IDEAS
# =========================
def get_employee_ideas_service(email):

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

# =========================
# UPDATE IDEA
# =========================
def update_idea_service(idea_id, updated_idea):

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

    cursor.execute(query, values)

    db.commit()

    cursor.close()
    db.close()

    return {
        "message": "Idea updated successfully"
    }

# =========================
# FORWARD IDEA
# =========================
def forward_idea_service(idea_id):

    db = get_db_connection()
    cursor = db.cursor()

    query = """
    UPDATE ideas1
    SET
        status=%s,
        rating=NULL,
        admin_feedback=NULL
    WHERE idea_id=%s
    """

    cursor.execute(query, ("Forwarded", idea_id))

    db.commit()

    cursor.close()
    db.close()

    return {
        "message": "Idea forwarded successfully"
    }