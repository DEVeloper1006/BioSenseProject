from flask import Flask, request, jsonify
from keras.applications.vgg16 import VGG16, preprocess_input, decode_predictions
from PIL import Image
import base64
import numpy as np
from flask_cors import CORS, cross_origin
from io import BytesIO
from keras.models import load_model, Sequential
import tensorflow as tf
from keras.layers import BatchNormalization, Conv2D, MaxPool2D, Activation, Flatten, Dropout, Dense
from keras.preprocessing.image import ImageDataGenerator

app = Flask(__name__)
cors = CORS(app, resources={r"/api/home": {"origins": "*"}})
model = Sequential()
model.add(Conv2D(32 , (3,3) , strides = 1 , padding = 'same' , activation = 'relu' , input_shape = (150,150,3)))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2) , strides = 2 , padding = 'same'))
model.add(Conv2D(64 , (3,3) , strides = 1 , padding = 'same' , activation = 'relu'))
model.add(Dropout(0.1))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2) , strides = 2 , padding = 'same'))
model.add(Conv2D(64 , (3,3) , strides = 1 , padding = 'same' , activation = 'relu'))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2) , strides = 2 , padding = 'same'))
model.add(Conv2D(128 , (3,3) , strides = 1 , padding = 'same' , activation = 'relu'))
model.add(Dropout(0.2))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2) , strides = 2 , padding = 'same'))
model.add(Conv2D(256 , (3,3) , strides = 1 , padding = 'same' , activation = 'relu'))
model.add(Dropout(0.2))
model.add(BatchNormalization())
model.add(MaxPool2D((2,2) , strides = 2 , padding = 'same'))
model.add(Flatten())
model.add(Dense(units = 128 , activation = 'relu'))
model.add(Dropout(0.5))
model.add(Dense(units = 1 , activation = 'sigmoid'))

model.load_weights("weights.h5")
model.compile(optimizer = 'adam', loss='binary_crossentropy',metrics=['accuracy'])


@app.route('/api/home', methods=['POST'])
@cross_origin()
def fileUpload():
    data_url = request.form.get('image', '')
    encoded_data = data_url.split(',')[1]  # Extracting the base64-encoded part
    try:
        decoded_data = base64.b64decode(encoded_data)
        img = Image.open(BytesIO(decoded_data)).resize((150, 150))
      
        img = img.convert('RGB')  # Ensure the image is in RGB format
        img_array = np.array(img)
        img_array = img_array / 255.0
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
        # Use model.predict instead of model.predict_classes for a probability score
        prediction_prob = model.predict(img_array)[0][0]
        prediction_class = "Pneuomonia" if prediction_prob > 0.5 else "Normal" 
    
        return jsonify({'predictions': prediction_class})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == "__main__":
    app.run(debug=True, port=8080)