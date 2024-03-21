from sqlalchemy import Column, Integer, String
from database import Base
from pydantic import BaseModel
from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
from database import Base
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(255), nullable=False)
    password = Column(String(255), nullable=False)
    
    requests = relationship("Request", back_populates="user")
    
class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    link = Column(String(255), nullable=False)
    user_id = Column(Integer, nullable=False)
    
    requests = relationship("Request", back_populates="document")
    
class Request(Base):
    __tablename__ = "requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    prompt = Column(String, nullable=False)
    response = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="requests")
    document = relationship("Document", back_populates="requests")
    
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
        
        
class RESPONSE(BaseModel):
    document: str
    prompt: str
    class Config:
        orm_mode = True
        
