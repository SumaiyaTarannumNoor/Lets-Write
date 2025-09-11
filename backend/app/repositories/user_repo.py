from ..models.user import User
from ..extensions import db

class UserRepository:
    @staticmethod
    def create_user(user):
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def find_by_email(email):
        return User.query.filter_by(email=email).first()
