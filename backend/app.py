from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

model = pickle.load(open('backend/model.pkl', 'rb'))

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    area = data['area']
    bedrooms = data['bedrooms']
    bathrooms = data['bathrooms']
    features = np.array([[area, bedrooms, bathrooms]])
    predicted_price = model.predict(features)[0]
    return jsonify({'predicted_price': round(predicted_price, 2)})

if __name__ == '__main__':
    app.run(debug=True)
