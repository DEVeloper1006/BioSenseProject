from keras.preprocessing.image import ImageDataGenerator
from keras.models import load_model
from keras.layers import Dense, Flatten
from keras.models import Model

# Path to the directory containing the training images
train_data_dir = 'chest_xray/train'

# Constants
img_width, img_height = 224, 224
batch_size = 32
epochs = 10  # Number of epochs for training

# Load the pre-trained Teachable Machine model without top layers
pretrained_model = load_model('keras_model.h5', compile=False)

last_layer_name = pretrained_model.layers[-1].name

# Get the output tensor of the last convolutional layer
last_conv_layer = pretrained_model.get_layer(last_layer_name)
last_conv_output = last_conv_layer.output

# Flatten the output tensor to connect to Dense layers
x = Flatten()(last_conv_output)
x = Dense(1024, activation='relu')(x)
predictions = Dense(1, activation='sigmoid')(x)  # 1 class: Binary classification (Normal or Pneumonia)

# Create a new model by combining base model with custom top layers
model = Model(inputs=pretrained_model.input, outputs=predictions)

# Compile the model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Data augmentation and normalization for training
train_datagen = ImageDataGenerator(
    rescale=1. / 255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True)

train_generator = train_datagen.flow_from_directory(
    train_data_dir,
    target_size=(img_width, img_height),
    batch_size=batch_size,
    class_mode='binary')

# Train the model
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // batch_size,
    epochs=epochs)

# Save the fine-tuned model
model.save('fine_tuned_model.h5')