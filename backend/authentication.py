from datetime import datetime, timedelta
from typing import Optional
from fastapi import Header, HTTPException
from jose import JWTError, jwt
from database import SessionLocal
from models import User
from hashing import verify_password
from sqlalchemy.orm import Session
from database_operations import get_user
from loguru import logger
from fastapi import Depends

SECRET_KEY = "divyansh"
ALGORITHM = "HS256"

def authenticate_user(email: str, password: str):
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    logger.info(f"User: {user}")
    logger.info(f"email: {email}")
    if user is None:
        raise ValueError("The email does not exist")
    if not verify_password(password, user.password):
        return None
    return user

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(authorization: Optional[str] = Header(None)) -> Optional[User]:
    if authorization is None:
        return None
    try:
        scheme, token = authorization.split()
        if scheme.lower() != 'bearer':
            return None
    except ValueError:
        return None

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            return None
    except JWTError:
        return None

    db = SessionLocal()
    user = get_user(email, db)
    if user is None:
        return None
    return user

def get_current_user_token(user: User = Depends(get_current_user)):
    if user is None:
        raise HTTPException(status_code=401, detail="Could not validate credentials")
    return user