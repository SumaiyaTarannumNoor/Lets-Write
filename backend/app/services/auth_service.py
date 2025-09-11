from ..repositories.user_repo import UserRepository
from ..models.user import User
from ..extensions import bcrypt
from flask_jwt_extended import create_access_token

class AuthService:
    @staticmethod
    def register_user(email, username, password):
        hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
        user = User(email=email, username=username, password=hashed_pw)
        return UserRepository.create_user(user)

    @staticmethod
    def login_user(email, password):
        user = UserRepository.find_by_email(email)
        if user and bcrypt.check_password_hash(user.password, password):
            token = create_access_token(identity=user.id)
            return {"access_token": token}
        return None
