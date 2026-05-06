from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

client = AsyncIOMotorClient(settings.MONGO_URI)
db = client.zentrack

users_collection = db.get_collection("users")
subscriptions_collection = db.get_collection("subscriptions") 
payments_collection = db.get_collection("payments")