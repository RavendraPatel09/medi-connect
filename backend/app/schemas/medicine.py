from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from .user import User

class MedicineBase(BaseModel):
    name: str
    manufacturer: Optional[str] = None
    description: Optional[str] = None

class MedicineCreate(MedicineBase):
    pass

class Medicine(MedicineBase):
    id: int
    created_at: datetime
    
    model_config = {"from_attributes": True}

class ListingBase(BaseModel):
    price: float
    quantity: int = 1
    expiry_date: datetime
    is_active: bool = True

class ListingCreate(ListingBase):
    medicine_id: int

class Listing(ListingBase):
    id: int
    seller_id: int
    medicine_id: int
    created_at: datetime
    
    seller: Optional[User] = None
    medicine: Optional[Medicine] = None

    model_config = {"from_attributes": True}
