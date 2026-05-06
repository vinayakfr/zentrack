from pydantic import BaseModel
from typing import Optional
from enum import Enum

class PaymentStatus(str, Enum):
    pending = "pending"
    paid = "paid"
    overdue = "overdue"

class PaymentUpdate(BaseModel):
    status: PaymentStatus