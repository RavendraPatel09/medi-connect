from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="MediCycle API",
    description="Backend API for the MediCycle platform",
    version="0.1.0",
)

# Configure CORS for the separate frontend applications
app.add_middleware(
    CORSMiddleware,
    allow_origins=[],
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api.websockets import router as websockets_router
from app.api.auth import router as auth_router
from app.api.medicines import router as medicines_router
from app.core.config import settings

app.include_router(websockets_router)
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(medicines_router, prefix=f"{settings.API_V1_STR}/medicines", tags=["medicines"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "MediCycle API is running"}
