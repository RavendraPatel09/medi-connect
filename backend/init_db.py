import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from app.db.session import engine, Base
from app.models import *

print("Creating database tables...")
Base.metadata.create_all(bind=engine)
print("Database tables created.")
