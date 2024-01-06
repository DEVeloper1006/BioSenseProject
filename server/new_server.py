import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
from keras.models import load_model
import numpy as np
from keras.preprocessing import image
from keras.applications.vgg16 import preprocess_input, decode_predictions, VGG16

app = Flask(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}}) 
model = VGG16()

@app.route('/api/home', methods=['POST'])
@cross_origin()
def fileUpload():
    uploaded_file = request.files['image']
    print(uploaded_file)
    return jsonify({ "message" : "data sent successfully"})
    
    '''
    img = image.load_img(destination, target_size=(224, 224))
    img = image.img_to_array(img)
    img = img.reshape((1, img.shape[0],img.shape[1], img.shape[2]))
    img = preprocess_input(img)
    
    predictions = model.predict(img)
    result = decode_predictions(predictions)
    label = result[0][0]
    
    response = jsonify({'result' : str(label[2])})
    return response
    '''

if __name__ == "__main__":
    app.run(debug=True, port=8080)