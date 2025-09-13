from flask import Flask, request, jsonify
from flask_cors import CORS
from text_generator import generate_text

app = Flask(__name__)
CORS(app)

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


if __name__ == "__main__":
    app.run(debug=True)
