from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.db.database import subscriptions_collection, payments_collection
from datetime import datetime, timedelta

scheduler = AsyncIOScheduler()

async def generate_upcoming_payments():
    today = datetime.utcnow()
    seven_days_later = (today + timedelta(days=7)).strftime("%Y-%m-%d")

    cursor = subscriptions_collection.find({"status": "active"})
    async for sub in cursor:
        # check if payment already exists for this due date
        existing = await payments_collection.find_one({
            "subscription_id": str(sub["_id"]),
            "due_date": sub["next_due_date"]
        })
        if not existing and sub["next_due_date"] <= seven_days_later:
            await payments_collection.insert_one({
                "user_id": sub["user_id"],
                "subscription_id": str(sub["_id"]),
                "service_name": sub["service_name"],
                "amount": sub["price"],
                "due_date": sub["next_due_date"],
                "status": "pending",
                "created_at": today.isoformat()
            })

def start_scheduler():
    scheduler.add_job(generate_upcoming_payments, "interval", hours=24)
    scheduler.start()