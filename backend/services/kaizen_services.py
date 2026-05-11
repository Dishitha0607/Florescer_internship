import os
import uuid
import shutil
from database.db import get_db_connection


# =========================
# SUBMIT KAIZEN
# =========================
def submit_kaizen_service(idea_id, actual_budget, implementation_details, image):

    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        cursor.execute(
            "SELECT implementation_image FROM ideas1 WHERE idea_id=%s",
            (idea_id,)
        )

        old_data = cursor.fetchone()
        image_name = old_data["implementation_image"]

        os.makedirs("uploads", exist_ok=True)

        # SAVE IMAGE
        if image:
            unique_name = f"{uuid.uuid4()}_{image.filename}"
            image_path = f"uploads/{unique_name}"

            with open(image_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)

            image_name = unique_name

        query = """
        UPDATE ideas1
        SET actual_budget=%s,
            implementation_details=%s,
            implementation_image=%s,
            kaizen_status=%s
        WHERE idea_id=%s
        """

        cursor.execute(query, (
            actual_budget,
            implementation_details,
            image_name,
            "Under Review",
            idea_id
        ))

        db.commit()
        cursor.close()
        db.close()

        return {"message": "Kaizen submitted successfully"}

    except Exception as e:
        print("ERROR submit_kaizen_service:", e)
        return {"error": str(e)}


# =========================
# APPROVE KAIZEN
# =========================
def approve_kaizen_service(idea_id):

    try:
        db = get_db_connection()
        cursor = db.cursor()

        cursor.execute(
            "UPDATE ideas1 SET kaizen_status=%s WHERE idea_id=%s",
            ("Approved", idea_id)
        )

        db.commit()
        cursor.close()
        db.close()

        return {"message": "Kaizen Approved"}

    except Exception as e:
        print("ERROR approve_kaizen_service:", e)
        return {"error": str(e)}


# =========================
# REJECT KAIZEN
# =========================
def reject_kaizen_service(idea_id):

    try:
        db = get_db_connection()
        cursor = db.cursor()

        cursor.execute(
            "UPDATE ideas1 SET kaizen_status=%s WHERE idea_id=%s",
            ("Rejected", idea_id)
        )

        db.commit()
        cursor.close()
        db.close()

        return {"message": "Kaizen Rejected"}

    except Exception as e:
        print("ERROR reject_kaizen_service:", e)
        return {"error": str(e)}