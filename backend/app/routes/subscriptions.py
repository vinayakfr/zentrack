from fastapi import APIRouter, HTTPException, Depends
from app.models.subscriptions import SubscriptionCreate
from app.db.database import subscriptions_collection
from app.routes.auth import get_current_user
from bson import ObjectId
from datetime import datetime

router = APIRouter(prefix="/subscriptions", tags=["subscriptions"])

@router.post("/")
async def add_subscription(sub: SubscriptionCreate, current_user=Depends(get_current_user)):
    new_sub = {
        "user_id": str(current_user["_id"]),
        "service_name": sub.service_name,
        "plan_name": sub.plan_name,
        "price": sub.price,
        "billing_cycle": sub.billing_cycle,
        "next_due_date": sub.next_due_date,
        "status": "active",
        "created_at": datetime.utcnow().isoformat()
    }
    result = await subscriptions_collection.insert_one(new_sub)
    return {"message": "Subscription added", "id": str(result.inserted_id)}

@router.get("/")
async def get_subscriptions(current_user=Depends(get_current_user)):
    subs = []
    cursor = subscriptions_collection.find({
        "user_id": str(current_user["_id"]),
        "status": "active"
    })
    async for sub in cursor:
        sub["id"] = str(sub["_id"])
        del sub["_id"]
        subs.append(sub)
    return subs

@router.delete("/{sub_id}")
async def delete_subscription(sub_id: str, current_user=Depends(get_current_user)):
    result = await subscriptions_collection.update_one(
        {"_id": ObjectId(sub_id), "user_id": str(current_user["_id"])},
        {"$set": {"status": "cancelled"}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Subscription not found")
    return {"message": "Subscription cancelled"}