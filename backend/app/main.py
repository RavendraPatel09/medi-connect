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
    allow_origins=[
        "http://localhost:5173", # Buyer
        "http://localhost:5174", # Seller
        "http://localhost:5175", # Admin
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "MediCycle API is running"}
