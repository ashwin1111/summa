from database import SessionLocal
from models import User, Document, UserCreate, UserLogin
from fastapi import FastAPI, HTTPException, Response, File, UploadFile, status
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from database import SessionLocal 
from datetime import datetime, timedelta
from fastapi import Depends
from hashing import hash_password, verify_password
from database_operations import create_document_in_database, create_user_in_database, get_user
from authentication import authenticate_user, create_access_token, get_current_user
from aws import s3_upload

from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4

origins = [
    "http://localhost:5173",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"], 
)

KB = 1024
MB = 1024 * KB

@app.post("/register")
async def create_user(user: UserCreate):
    create_user_in_database(user.email, user.username, user.password)
    return {"message": "User created successfully"}

@app.post("/login")
async def login(user: UserLogin):
    try:
        db_user = authenticate_user(user.email, user.password)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
    
    if not db_user:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer", "user_id": db_user.id, "username": db_user.username}

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content=jsonable_encoder({"detail": exc.errors(), "body": exc.body}),
)

@app.post('/upload')
async def upload_file(user_id: str, file: UploadFile = File(...)):
    if not file:
        raise HTTPException(
            status_code=400, detail="No file uploaded"
        )
    print(user_id)
    contents = await file.read()
    size = len(contents)
    
    if not 0<size<=2*MB:
        raise HTTPException(
            status_code=400, detail="File size should be less than 2MB"
        )
        
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(
            status_code=400, detail="Only PDF files are allowed"
        )
    object_url = await s3_upload(contents=contents, key=f'{uuid4()}.pdf')
    create_document_in_database(file.filename, object_url, int(user_id))
    return {"link": object_url}

@app.get("/documents/{user_id}")
async def get_documents(user_id: int):
    db = SessionLocal()
    documents = db.query(Document).filter(Document.user_id == user_id).all()
    return {"documents": documents}

