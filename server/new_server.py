import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from keras.models import load_model
import numpy as np
from keras.preprocessing import image
from keras.applications.vgg16 import preprocess_input, decode_predictions, VGG16


UPLOAD_FOLDER = '/Users/devmody/Documents/Projects/biosense/server/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)
model = VGG16()

@app.route('/upload', methods=['POST'])
def fileUpload():
    target=os.path.join(UPLOAD_FOLDER,'test_docs')
    if not os.path.isdir(target):
        os.mkdir(target)
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([target, filename])
    file.save(destination)
    
    img = image.load_img(destination, target_size=(224, 224))
    img = image.img_to_array(img)
    img = img.reshape((1, img.shape[0],img.shape[1], img.shape[2]))
    img = preprocess_input(img)
    
    predictions = model.predict(img)
    result = decode_predictions(predictions)
    label = result[0][0]
    
    response = jsonify({'result' : str(label[2])})
    return response

if __name__ == "__main__":
    app.run(debug=True)
