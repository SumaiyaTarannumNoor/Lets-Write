import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from ai.gemini import Gemini
from ai.mistral import Mistral

load_dotenv()

app = Flask(__name__)
CORS(app)

def load_prompt(filename):
    """Helper to load specific prompt files."""
    try:
        path = os.path.join("src", "prompts", filename)
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        print(f"Warning: {filename} not found.")
        return None

# --- Load Separate Prompts ---
system_prompt_gemini = load_prompt("system_prompt_gemini.md")
system_prompt_mistral = load_prompt("system_prompt_mistral.md")

# --- API Key Loading ---
gemini_api_key = os.getenv("GEMINI_API_KEY")
mistral_api_key = os.getenv("MISTRAL_API_KEY")

if not gemini_api_key or not mistral_api_key:
    raise ValueError("API keys for Gemini or Mistral are missing in .env")


gemini_platform = Gemini(
    api_key=gemini_api_key, 
    system_prompt_gemini=system_prompt_gemini
)
mistral_platform = Mistral(
    api_key=mistral_api_key, 
    system_prompt_mistral_mistral_mistral_mistral=system_prompt_mistral
)


@app.route("/api/generate", methods=["POST"])
def generate():
    try:
        data = request.get_json() if request.is_json else request.form.to_dict()
        prompt = data.get("prompt", "")
        provider = data.get("provider", "mistral").lower()

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        if provider == "gemini":
            result = gemini_platform.chat(prompt)
        else:
            result = mistral_platform.chat(prompt)

        return jsonify({"text": result, "provider": provider})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/chat-gemini", methods=["POST"])
def chat_gemini():
    data = request.get_json()
    if not data or "prompt" not in data:
        return jsonify({"error": "prompt is required"}), 400
    return jsonify({"response": gemini_platform.chat(data["prompt"])})

@app.route("/api/chat-mistral", methods=["POST"])
def chat_mistral():
    data = request.get_json()
    if not data or "prompt" not in data:
        return jsonify({"error": "prompt is required"}), 400
    return jsonify({"response": mistral_platform.chat(data["prompt"])})

if __name__ == "__main__":
    app.run(debug=True)
