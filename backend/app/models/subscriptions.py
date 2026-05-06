from pydantic import BaseModel
from typing import Optional
from enum import Enum

class BillingCycle(str, Enum):
    monthly = "monthly"
    yearly = "yearly"

class SubscriptionCreate(BaseModel):
    service_name: str
    plan_name: str
    price: float
    billing_cycle: BillingCycle
    next_due_date: str  # format: YYYY-MM-DD

class SubscriptionResponse(BaseModel):
    id: str
    service_name: str
    plan_name: str
    price: float
    billing_cycle: str
    next_due_date: str
    status: str