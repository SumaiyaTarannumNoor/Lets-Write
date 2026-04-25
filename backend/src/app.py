import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from text_generator import generate_text
from pydantic import BaseModel
from ai.gemini import Gemini
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

def load_system_prompt():
    try:
        with open("src/prompts/system_prompt.md", "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return None
    
system_prompt = load_system_prompt()   

gemini_api_key = os.getenv("GEMINI_API_KEY")

if not gemini_api_key:
    raise ValueError("GEMINI_API_KEY environment variable not set.")

ai_platform = Gemini(
    api_key=gemini_api_key,
    system_prompt=system_prompt
)

@app.route("/api/generate", methods=["POST"])
def generate():
    print("Request headers:", dict(request.headers))  # Debug
    print("Request content type:", request.content_type)  # Debug

    try:
        # JSON preferred
        if request.is_json:
            data = request.get_json()
            print("Received JSON data:", data)
        else:
            # fallback
            data = request.form.to_dict()
            print("Received form data:", data)

        prompt = data.get("prompt", "The")
        length = int(data.get("length", 300))

        print(f"Processing: prompt='{prompt}', length={length}")

        result = generate_text(prompt, length)
        return jsonify({"text": result})

    except Exception as e:
        print("Error:", str(e))  # Debug
        return jsonify({"error": str(e)}), 500

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    if not data or "prompt" not in data:
        return jsonify({"error": "prompt is required"}), 400

    response_text = ai_platform.chat(data["prompt"])

    return jsonify({
        "response": response_text
    })

if __name__ == "__main__":
    app.run(debug=True)
