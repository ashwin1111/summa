from passlib.context import CryptContext

# Create a password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function to hash a password
def hash_password(password: str) -> str:
    """
    Hashes a password using bcrypt.
    
    Parameters:
        password (str): The password to be hashed.
    
    Returns:
        str: The hashed password.
    """
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verifies a password against a hashed password.
    
    Parameters:
        plain_password (str): The plain text password.
        hashed_password (str): The hashed password.
    
    Returns:
        bool: True if the password is verified, False otherwise.
    """
    return pwd_context.verify(plain_password, hashed_password)