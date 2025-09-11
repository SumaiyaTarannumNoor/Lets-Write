from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.text_service import TextService

text_bp = Blueprint("text_bp", __name__)

@text_bp.route("/generate", methods=["POST"])
@jwt_required()  # JWT protected
def generate_text_route():
    try:
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()

        prompt = data.get("prompt", "The")
        length = int(data.get("length", 300))

        # Keep old debug prints if you want
        print(f"Processing: prompt='{prompt}', length={length}")

        # Call the same generate_text function
        generated = TextService.generate(prompt)

        return jsonify({"text": generated})

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": str(e)}), 500
