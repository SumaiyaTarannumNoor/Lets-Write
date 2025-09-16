from flask import Flask
from config import Config
from extensions import db, migrate, jwt
from blueprints.auth import auth_bp
from blueprints.generate_bp import gen_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    # init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)

    # register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(gen_bp)

    @app.route("/")
    def index():
        return {"ok": True, "message": "LetsWrite API"}

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
