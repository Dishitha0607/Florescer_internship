from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional

from services.kaizen_services import (
    submit_kaizen_service,
    approve_kaizen_service,
    reject_kaizen_service
)

router = APIRouter()


@router.put("/submitKaizen/{idea_id}")
async def submit_kaizen(
    idea_id: str,
    actual_budget: float = Form(...),
    implementation_details: str = Form(...),
    image: Optional[UploadFile] = File(None)
):
    return submit_kaizen_service(
        idea_id,
        actual_budget,
        implementation_details,
        image
    )


@router.put("/approveKaizen/{idea_id}")
def approve_kaizen(idea_id: str):
    return approve_kaizen_service(idea_id)


@router.put("/rejectKaizen/{idea_id}")
def reject_kaizen(idea_id: str):
    return reject_kaizen_service(idea_id)