from database.db import get_db_connection

# =========================
# DASHBOARD STATS
# =========================
def dashboard_stats_service():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # Example stats query (adjust if you already have one)
        query = """
        SELECT 
            COUNT(*) AS total,
            SUM(status IN ('Pending', 'Forwarded')) AS pending,
            SUM(status = 'Accepted') AS accepted,
            SUM(status = 'Rejected') AS rejected,
            SUM(status = 'Forwarded') AS forwarded
        FROM ideas1
        """

        cursor.execute(query)
        result = cursor.fetchone()

        cursor.close()
        db.close()

        return result

    except Exception as e:
        print("ERROR dashboard_stats_service:", e)
        return {}


# =========================
# GET ADMIN IDEAS
# =========================
def get_admin_ideas_service():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        query = """
        SELECT * FROM ideas1
        WHERE status IN ("Forwarded", "Accepted", "Rejected")
        ORDER BY id DESC
        """

        cursor.execute(query)
        ideas = cursor.fetchall()

        cursor.close()
        db.close()

        return ideas

    except Exception as e:
        print("ERROR get_admin_ideas_service:", e)
        return []


# =========================
# APPROVE IDEA
# =========================
def approve_idea_service(idea_id, data):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = """
        UPDATE ideas1
        SET status=%s, rating=%s, admin_feedback=%s
        WHERE idea_id=%s
        """

        cursor.execute(query, ("Accepted", data.rating, data.feedback, idea_id))

        db.commit()
        cursor.close()
        db.close()

        return {"message": "Idea Approved"}

    except Exception as e:
        print("ERROR approve_idea_service:", e)
        return {"error": str(e)}


# =========================
# REJECT IDEA
# =========================
def reject_idea_service(idea_id, data):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = """
        UPDATE ideas1
        SET status=%s, rating=%s, admin_feedback=%s
        WHERE idea_id=%s
        """

        cursor.execute(query, ("Rejected", data.rating, data.feedback, idea_id))

        db.commit()
        cursor.close()
        db.close()

        return {"message": "Idea Rejected"}

    except Exception as e:
        print("ERROR reject_idea_service:", e)
        return {"error": str(e)}


# =========================
# EMPLOYEE TOTAL STARS
# =========================
def employee_stars_service():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        query = """
        SELECT emp_name, COALESCE(SUM(rating),0) AS total_stars
        FROM ideas1
        GROUP BY emp_name
        ORDER BY total_stars DESC
        """

        cursor.execute(query)
        result = cursor.fetchall()

        cursor.close()
        db.close()

        return result

    except Exception as e:
        print("ERROR employee_stars_service:", e)
        return []


# =========================
# UPDATE STATUS
# =========================
def update_status_service(idea_id, status):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = """
        UPDATE ideas1
        SET status=%s
        WHERE idea_id=%s
        """

        cursor.execute(query, (status, idea_id))

        db.commit()
        cursor.close()
        db.close()

        return {"message": "Status updated"}

    except Exception as e:
        print("ERROR update_status_service:", e)
        return {"error": str(e)}