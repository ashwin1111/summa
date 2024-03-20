from sqlalchemy import Column, Integer, String
from database import Base
from pydantic import BaseModel

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    
class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    link = Column(String(255), nullable=False)
    user_id = Column(Integer, nullable=False)
    
class UserCreate(BaseModel):
    email: str
    username: str
    password: str

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: str
    password: str
    
    class Config:
        orm_mode = True