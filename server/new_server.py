from flask import Flask, request, jsonify
from keras.applications.vgg16 import VGG16, preprocess_input, decode_predictions
from PIL import Image
import base64
import numpy as np
from flask_cors import CORS, cross_origin
from io import BytesIO

app = Flask(__name__)
cors = CORS(app, resources={r"/api/home": {"origins": "*"}})
model = VGG16(weights='imagenet', include_top=True)

@app.route('/api/home', methods=['POST'])
@cross_origin()
def fileUpload():
    data_url = request.form.get('image', '')
    encoded_data = data_url.split(',')[1]  # Extracting the base64-encoded part
    try:
        decoded_data = base64.b64decode(encoded_data)
        img = Image.open(BytesIO(decoded_data)).resize((224, 224))
        img = img.convert('RGB')  # Ensure the image is in RGB format
        img_array = np.array(img)
        img_array = preprocess_input(img_array)  # Preprocess the image
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        predictions = model.predict(img_array)
        
        decoded_predictions = decode_predictions(predictions, top=3)[0]
        
        results = []
        for prediction in decoded_predictions:
            if len(prediction) == 3:
                label, description, probability = prediction
                results.append({
                    'label': label,
                    'description': description,
                    'probability': float(probability)
                })
            elif len(prediction) == 4:
                class_id, label, description, probability = prediction
                results.append({
                    'label': label,
                    'description': description,
                    'probability': float(probability)
                })
        
        return jsonify({'predictions': results})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=8080)
