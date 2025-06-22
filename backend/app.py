from flask import Flask, request, jsonify
from flask_cors import CORS
from text_generator import generate_text

app = Flask(__name__)
CORS(app)

@app.route("/api/generate", methods=["POST"])
def generate():
    print("Request headers:", dict(request.headers))  # Debug line
    print("Request content type:", request.content_type)  # Debug line
    
    try:
        # Try to get JSON data
        if request.is_json:
            data = request.get_json()
            print("Received JSON data:", data)  # Debug line
        else:
            # Fallback to form data
            data = request.form.to_dict()
            print("Received form data:", data)  # Debug line
            
        prompt = data.get("prompt", "The")
        length = int(data.get("length", 300))
        
        print(f"Processing: prompt='{prompt}', length={length}")  # Debug line
        
        result = generate_text(prompt, length)
        return jsonify({"text": result})
        
    except Exception as e:
        print("Error:", str(e))  # Debug line
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)