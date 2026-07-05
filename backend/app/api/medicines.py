from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import models, schemas
from app.api import deps
from app.models.user import RoleEnum

router = APIRouter()

@router.get("/", response_model=List[schemas.Listing])
def read_listings(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(deps.get_db),
):
    listings = db.query(models.Listing).filter(models.Listing.is_active == True).offset(skip).limit(limit).all()
    return listings

@router.post("/", response_model=schemas.Listing)
def create_listing(
    *,
    db: Session = Depends(deps.get_db),
    listing_in: schemas.ListingCreate,
    current_user: models.User = Depends(deps.get_current_user),
):
    if current_user.role != RoleEnum.SELLER:
        raise HTTPException(status_code=403, detail="Only sellers can create listings")
    
    # Check if medicine exists
    medicine = db.query(models.Medicine).filter(models.Medicine.id == listing_in.medicine_id).first()
    if not medicine:
        raise HTTPException(status_code=404, detail="Medicine not found")

    listing = models.Listing(
        seller_id=current_user.id,
        medicine_id=listing_in.medicine_id,
        price=listing_in.price,
        quantity=listing_in.quantity,
        expiry_date=listing_in.expiry_date,
    )
    db.add(listing)
    db.commit()
    db.refresh(listing)
    return listing

@router.post("/medicine", response_model=schemas.Medicine)
def create_medicine(
    *,
    db: Session = Depends(deps.get_db),
    medicine_in: schemas.MedicineCreate,
    current_user: models.User = Depends(deps.get_current_user),
):
    if current_user.role not in [RoleEnum.SELLER, RoleEnum.ADMIN]:
        raise HTTPException(status_code=403, detail="Not enough permissions")
        
    medicine = models.Medicine(
        name=medicine_in.name,
        manufacturer=medicine_in.manufacturer,
        description=medicine_in.description
    )
    db.add(medicine)
    db.commit()
    db.refresh(medicine)
    return medicine
