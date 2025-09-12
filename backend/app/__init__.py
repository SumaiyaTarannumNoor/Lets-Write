from flask import Flask
from .extensions import db, migrate, jwt, bcrypt
from .controllers.auth_controller import auth_bp
from .controllers.text_controller import text_bp
from .config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(text_bp, url_prefix="/text")

    return app
