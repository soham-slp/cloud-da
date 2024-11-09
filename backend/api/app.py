from flask import Flask
from blueprint import main_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    app.register_blueprint(main_bp)
    
    return app