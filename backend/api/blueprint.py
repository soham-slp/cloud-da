from flask import Blueprint, request, jsonify
import joblib
import pandas as pd
from sklearn.pipeline import Pipeline

main_bp = Blueprint('main_bp', __name__)

@main_bp.post('/pred')
def pred():
    pipeline: Pipeline = joblib.load('../pipeline.joblib')
    data = request.get_json()

    df = pd.DataFrame([data])
    
    return jsonify(data=pipeline.predict(df).tolist()[0])   
    