from hashing import hash_password
from models import Document, User
from sqlalchemy.orm import Session
from database import SessionLocal


def create_document_in_database(name: str,link: str, user_id: int):
    db = SessionLocal()
    try:
        new_document = Document(name=name, link=link, user_id=user_id)
        db.add(new_document)
        db.commit()
        db.refresh(new_document)
    finally:
        db.close()

def create_user_in_database(email: str, username: str, password: str):
    # Create a database session
    db = SessionLocal()
    hashed_password = hash_password(password)
    try:
        new_user = User(email=email, username=username, password=hashed_password)

        db.add(new_user)

        db.commit()

        db.refresh(new_user)
    finally:
        db.close()
        
def get_user(email: str, db: Session):
    return db.query(User).filter(User.email == email).first()
        