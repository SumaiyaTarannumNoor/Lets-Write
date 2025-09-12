from flask import Blueprint, request, jsonify
from ..services.auth_services import AuthService  # fixed import filename

auth_bp = Blueprint("auth_bp", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    user = AuthService.register_user(data["email"], data["username"], data["password"])
    return jsonify({
        "id": user.id,
        "email": user.email,
        "username": user.username
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    token = AuthService.login_user(data["email"], data["password"])
    if token:
        return jsonify(token), 200
    return jsonify({"msg": "Invalid credentials"}), 401
