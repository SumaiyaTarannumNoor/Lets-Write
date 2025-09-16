from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
# import your generator function; ensure name matches your file
from text_generator import generate_text  # adjust if filename is text_genrator.py

gen_bp = Blueprint("generate", __name__, url_prefix="/api")

@gen_bp.route("/generate", methods=["POST"])
@jwt_required()  # protect generation — remove decorator if you want public access
def generate():
    current_app.logger.debug("Generate called by user id: %s", get_jwt_identity())
    data = request.get_json() or request.form.to_dict()
    prompt = data.get("prompt", "The")
    try:
        length = int(data.get("length", 300))
    except Exception:
        length = 300
    # keep other options if your generator supports temperature, top_k, top_p
    try:
        result = generate_text(prompt, length)
        return jsonify({"text": result})
    except Exception as e:
        current_app.logger.exception("Generation failed")
        return jsonify({"error": str(e)}), 500
