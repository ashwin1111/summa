from database import SessionLocal
from models import User, Document, UserCreate, UserLogin, RESPONSE
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
from sqlalchemy import and_
import asyncio
from loguru import logger
from llm import LLM

import uvicorn


# origins = [
#     "http://localhost:5173",
# ]

app = FastAPI()
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"], 
# )

KB = 1024
MB = 1024 * KB

@app.post("/register")
async def create_user(user: UserCreate):
    db = SessionLocal()
    user_check = db.query(User).filter(User.email == user.email).first()
    if user_check is not None:
        raise HTTPException(status_code=400, detail="Email already registered")
    
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
        
    try:
        task = asyncio.create_task(s3_upload(contents=contents, key=f'{uuid4()}.pdf'))
        object_url = await asyncio.wait_for(task, timeout=90.0)  # 90 seconds (1.5 minutes) timeout 
        # object_url = await s3_upload(contents=contents, key=f'{uuid4()}.pdf')
        create_document_in_database(file.filename, object_url, int(user_id))
        db = SessionLocal()
        documents = db.query(Document).filter(Document.user_id == user_id).all()
        return {"documents": documents}

    except asyncio.TimeoutError:
        raise HTTPException(
            status_code=504,  # Use Gateway Timeout status code 
            detail="File upload to AWS timed out. Please try again later."
        )
    except Exception as e:  # Catch other potential S3 errors
        logger.error(f"Error uploading to S3: {e}")
        raise HTTPException(
            status_code=500,  # Internal Server Error
            detail="An error occurred during upload. Please try again later." 
        )

@app.get("/documents/{user_id}")
async def get_documents(user_id: int, search_term: str = None):  # Add 'search_term' parameter
    db = SessionLocal()

    filters = [Document.user_id == user_id]  # Add filtering conditions to a list

    if search_term:
        filters.append(Document.name.ilike(f"%{search_term}%"))  # Add search term filter

    documents = db.query(Document).filter(and_(*filters)).all()  # Apply all filters
    return {"documents": documents}

@app.post('/response')
async def resp(response:RESPONSE):
    llm = LLM(logger)

    resp = llm.generate_response(response.document, response.prompt)
    
    return resp

if __name__ == "_main_":
    # import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8089)