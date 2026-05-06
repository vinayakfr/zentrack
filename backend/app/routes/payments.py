from fastapi import APIRouter, HTTPException, Depends
from app.db.database import payments_collection, subscriptions_collection
from app.routes.auth import get_current_user
from app.models.payment import PaymentUpdate
from bson import ObjectId
from datetime import datetime, timedelta

router = APIRouter(prefix="/payments", tags=["payments"])

@router.get("/upcoming")
async def get_upcoming_payments(current_user=Depends(get_current_user)):
    today = datetime.utcnow()
    thirty_days = (today + timedelta(days=30)).isoformat()

    payments = []
    cursor = payments_collection.find({
        "user_id": str(current_user["_id"]),
        "status": "pending",
        "due_date": {"$lte": thirty_days}
    })
    async for payment in cursor:
        payment["id"] = str(payment["_id"])
        del payment["_id"]
        payments.append(payment)
    return payments

@router.get("/history")
async def get_payment_history(current_user=Depends(get_current_user)):
    payments = []
    cursor = payments_collection.find({
        "user_id": str(current_user["_id"]),
        "status": {"$in": ["paid", "overdue"]}
    })
    async for payment in cursor:
        payment["id"] = str(payment["_id"])
        del payment["_id"]
        payments.append(payment)
    return payments

@router.patch("/{payment_id}")
async def update_payment_status(
    payment_id: str,
    update: PaymentUpdate,
    current_user=Depends(get_current_user)
):
    result = await payments_collection.update_one(
        {"_id": ObjectId(payment_id), "user_id": str(current_user["_id"])},
        {"$set": {"status": update.status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Payment not found")
    return {"message": "Payment updated"}