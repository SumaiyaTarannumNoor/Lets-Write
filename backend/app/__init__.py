from flask import Flask
from .config import Config
from .extensions import db, migrate, jwt, bcrypt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)

    # Register blueprints
    from .controllers.auth_controller import auth_bp
    from .controllers.text_controller import text_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(text_bp, url_prefix="/api/text")

    return app
