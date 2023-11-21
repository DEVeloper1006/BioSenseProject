from keras.preprocessing.image import ImageDataGenerator
from keras.models import load_model
from keras import optimizers
from keras.layers import Dense, GlobalAveragePooling2D
from keras.models import Model

# Path to the directory containing the training images
train_data_dir = 'chest_xray/train'

# Constants
img_width, img_height = 224, 224
batch_size = 32
epochs = 10  # Number of epochs for training

# Load the pre-trained Teachable Machine model
pretrained_model = load_model('keras_model.h5')

# Freeze the layers of the pre-trained model
for layer in pretrained_model.layers:
    layer.trainable = False

# Create a new top model to be fine-tuned
x = pretrained_model.output
x = GlobalAveragePooling2D()(x)
x = Dense(1024, activation='relu')(x)
predictions = Dense(2, activation='softmax')(x)  # 2 classes: Normal and Pneumonia

# Combine the base pre-trained model with the new top model
model = Model(inputs=pretrained_model.input, outputs=predictions)

# Compile the model
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

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
    class_mode='categorical')

# Train the model
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // batch_size,
    epochs=epochs)

# Save the fine-tuned model
model.save('fine_tuned_model.h5')