from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np
import os
import matplotlib.pyplot as plt

def process_image(img_path, model, class_names, confidence_scores):
    # Create the array of the right shape to feed into the keras model
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

    # Load and preprocess the image
    image = Image.open(img_path).convert("RGB")
    size = (224, 224)
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS)
    image_array = np.asarray(image)
    normalized_image_array = (image_array.astype(np.float32) / 127.5) - 1
    data[0] = normalized_image_array

    # Make predictions
    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]

    confidence_scores.append(confidence_score)
    # Print prediction and confidence score for the current image
    print(f"Image: {img_path} - Class: {class_name[2:]}, Confidence Score: {confidence_score}")
    

# Load the model
model = load_model("keras_Model.h5", compile=False)

# Load the labels
class_names = open("labels.txt", "r").readlines()

# Define the paths to your NORMAL and PNEUMONIA testing images directories
normal_testing_dir = "chest_xray/test/NORMAL"  # Replace with the path to your NORMAL directory
pneumonia_testing_dir = "chest_xray/test/PNEUMONIA"  # Replace with the path to your PNEUMONIA directory

# Initialize lists to store image paths for NORMAL and PNEUMONIA images
normal_images = [os.path.join(normal_testing_dir, img) for img in os.listdir(normal_testing_dir)]
pneumonia_images = [os.path.join(pneumonia_testing_dir, img) for img in os.listdir(pneumonia_testing_dir)]
    
normal_confidence_scores = []
pneumonia_confidence_scores = []

while normal_images and pneumonia_images:
    # Process one image from NORMAL folder
    normal_img_path = normal_images.pop(0)
    process_image(normal_img_path, model, class_names, normal_confidence_scores)

    # Process one image from PNEUMONIA folder
    pneumonia_img_path = pneumonia_images.pop(0)
    process_image(pneumonia_img_path, model, class_names, pneumonia_confidence_scores)

average_normal_confidence = np.mean(normal_confidence_scores)
average_pneumonia_confidence = np.mean(pneumonia_confidence_scores)

# Plotting average confidence scores
plt.figure(figsize=(8, 6))
plt.bar(['NORMAL', 'PNEUMONIA'], [average_normal_confidence, average_pneumonia_confidence], color=['blue', 'red'])
plt.title('Average Confidence Scores for NORMAL and PNEUMONIA Images')
plt.xlabel('Image Type')
plt.ylabel('Average Confidence Score')
plt.ylim(0, 1)  # Set y-axis limit from 0 to 1 (as confidence scores range from 0 to 1)
plt.show()