from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

user = 'postgres'
password = "divyansh"  # Remove the comma after this line
port = 5432
host = "chat-with-pdf.cv0uk00owx9y.eu-north-1.rds.amazonaws.com"
database = "initial_db"

DATABASE_URL = f"postgresql://{user}:{password}@{host}:{port}/{database}"

engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for SQLAlchemy models
Base = declarative_base()