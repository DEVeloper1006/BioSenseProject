# Biosense: Pneumonia Detection AI

Biosense is a web application designed to detect pneumonia in chest X-ray images using a deep learning model. This project incorporates a React.js frontend, Flask backend, and a convolutional neural network (CNN) model trained using TensorFlow/Keras.

---

## Project Structure

### **Frontend**
- Built with **React.js**
- Key components:
  - `FileUpload.js`: A drag-and-drop file uploader with preview functionality.
  - `index.js`: Main entry point, integrates components like `NavBar`, `Body`, and `Footer`.

### **Backend**
- Developed using **Flask**.
- Handles API requests for pneumonia detection.
- Loads and runs the trained CNN model.

### **Machine Learning Model**
- A CNN built and trained using **TensorFlow/Keras**.
- Model architecture:
  - Multiple convolutional layers with batch normalization and max-pooling.
  - Dense layers with dropout for regularization.
  - Binary classification with sigmoid activation.
- Data augmentation applied to training data using `ImageDataGenerator`.

---

## Key Files

### **Frontend**

#### `FileUpload.js`
Provides a user interface for uploading X-ray images via drag-and-drop or file selection.

```javascript
// Code excerpt from FileUpload.js
import React, { useState } from "react";

const FileUpload = ({ image, setImage, sendData }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  return (
    <div
      className={`container flex items-center justify-center object-contain ${isDragOver ? "drag-over" : "drag-leave"}`}
    >
      {/* UI implementation */}
    </div>
  );
};

export default FileUpload;
```

#### `index.js`
Main application entry point.

```javascript
import React from "react";
import Head from "next/head";
import NavBar from "./components/NavBar";
import Body from "./components/Body";
import Footer from "./components/Footer";

export default function index() {
  return (
    <div className="h-fit">
      <Head>
        <meta name="viewport" content="width=1.0, initial-scale=1.0" />
        <title>biosense</title>
      </Head>
      <NavBar />
      <Body />
      <Footer />
    </div>
  );
}
```

### **Backend**

#### `server.py`
Defines the Flask server, API routes, and model integration.

```python
from flask import Flask, request, jsonify
from keras.models import Sequential
from keras.layers import BatchNormalization, Conv2D, MaxPool2D, Flatten, Dropout, Dense
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

@app.route('/api/home', methods=['POST'])
def fileUpload():
    # Implementation here
    return jsonify({"message": "File processed"})

if __name__ == "__main__":
    app.run(debug=True)
```

### **Model Training**

#### `machineTrain.py`
Defines the CNN model architecture and training process.

```python
from keras.models import Sequential
from keras.layers import Conv2D, MaxPool2D, Flatten, Dropout, Dense
from keras.preprocessing.image import ImageDataGenerator

model = Sequential()
model.add(Conv2D(32, (3,3), activation='relu', input_shape=(150, 150, 3)))
model.add(MaxPool2D((2,2)))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dense(1, activation='sigmoid'))
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Training implementation
```

---

## Installation

### Prerequisites
- Node.js
- Python 3.8+
- TensorFlow/Keras

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/DEVeloper1006/biosense.git
   cd biosense
   ```
2. Install dependencies for the frontend:
   ```bash
   cd client
   npm install
   ```
3. Install dependencies for the backend:
   ```bash
   cd server
   pip install -r requirements.txt
   ```

4. Start the development server:
   ```bash
   flask run
   ```
5. Start the React frontend:
   ```bash
   npm start
   ```

---

## Usage
1. Upload a chest X-ray image via the drag-and-drop interface.
2. The backend processes the image using the CNN model.
3. Receive a diagnosis indicating the likelihood of pneumonia.

---

## Authors
- Meet P.
- Dev M.
- Vedant P.

---