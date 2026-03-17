import bcrypt
from datetime import datetime, timedelta
from typing import Optional, Union, Any
from app.core.config import settings
import jwt

def verify_password(plain_password: str, hashed_password: str) -> bool:
    plain_password_bytes = str(plain_password)[:72].encode('utf-8')
    hashed_password_bytes = str(hashed_password).encode('utf-8')
    return bcrypt.checkpw(plain_password_bytes, hashed_password_bytes)

def get_password_hash(password: str) -> str:
    password_bytes = str(password)[:72].encode('utf-8')
    return bcrypt.hashpw(password_bytes, bcrypt.gensalt()).decode('utf-8')


def create_access_token(subject: Union[str, Any], expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)

    to_encode = {"exp": expire, "sub": str(subject)}
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

    return encoded_jwt