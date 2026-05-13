from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from .db import get_db_connection
from .utils import is_valid_email

auth_bp = Blueprint("auth", __name__)

# Registration
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields required"}), 400
    
    if not is_valid_email(email):
        return jsonify({"error": "Invalid email"}), 400
    

    hashed_password = generate_password_hash(password)

    connection = get_db_connection()
    cur = connection.cursor()

    try: 
        cur.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, hashed_password)
        )
        connection.commit()
        return jsonify({"message": "User registration successful."})
        
    except Exception as e:
        return jsonify({"error": str(e)})
    finally:
        cur.close()
        connection.close()



# LOGIN
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    connection = get_db_connection()
    cur = connection.cursor()

    cur.execute("SELECT id, name, email, password FROM users WHERE email=%s", (email,))
    user = cur.fetchone()

    cur.close()
    connection.close()

    if not user:
        return jsonify({"error": "User not found"}), 404
    
    user_id, name, email, hashed_password = user

    if not check_password_hash(hashed_password, password):
        return jsonify({"error": "Invalid password"}), 401
    
    token = create_access_token(identity={"id": user_id, "email": email})

    return jsonify({
        "token": token,
        "user": {
            "id": user_id,
            "name": name,
            "email": email
        }
    })
