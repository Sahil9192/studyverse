from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import create_db_and_tables
from contextlib import asynccontextmanager
from app.routers import notes , auth

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Creating tables..")
    create_db_and_tables()
    yield

app = FastAPI(
    title="StudyVerse API",
    lifespan=lifespan)

origin = ["http://localhost:5173",]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(notes.router)

@app.get("/api/v1")
def read_root():
    return {"message": "Welcome to the StudyVerse API!"}