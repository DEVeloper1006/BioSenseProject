

import numpy as np
import pandas as pd
import tensorflow as tf
import matplotlib.pyplot as plt
import seaborn as sns
import matplotlib
matplotlib.use("Agg")

from keras.models import Sequential
from keras.layers import (BatchNormalization, Conv2D, MaxPool2D, Activation, Flatten, Dropout, Dense)
from keras import backend as K
from keras.preprocessing.image import ImageDataGenerator
from keras.callbacks import LearningRateScheduler
from keras.optimizers import Adam
from keras import utils
from sklearn.metrics import (classification_report, confusion_matrix)

NUMBER_OF_EPOCHS=10
BATCH_SIZE= 32


trainAug = ImageDataGenerator(
  rescale=1./255.,
  rotation_range=15,
  brightness_range=[0.2,1.2],
  width_shift_range=0.1,
  height_shift_range=0.1,
  shear_range=0.1,
  zoom_range=0.1,
  horizontal_flip=True,)

valAug=ImageDataGenerator(
  rescale=1./255)

testAug=ImageDataGenerator(rescale=1./255)

trainGen = trainAug.flow_from_directory(
  '/content/chest-xray-pneumonia/chest_xray/train',
  class_mode="binary",
  target_size=(150,150),
  shuffle=True,
  batch_size=BATCH_SIZE)

valGen = valAug.flow_from_directory(
  '/content/chest-xray-pneumonia/chest_xray/val',
  class_mode="binary",
  target_size=(150,150),
  shuffle=False,
  batch_size=BATCH_SIZE)

testGen = testAug.flow_from_directory(
  '/content/chest-xray-pneumonia/chest_xray/test',
  class_mode="binary",
  target_size=(150,150),
  shuffle=False,
  batch_size=BATCH_SIZE)


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


model.compile(optimizer = 'adam', loss='binary_crossentropy',metrics=['accuracy'])
model.summary()
from keras.callbacks import ReduceLROnPlateau, EarlyStopping

early_stopping = EarlyStopping(monitor='val_loss', patience=2, restore_best_weights=True)

# Define learning_rate
learning_rate_reduction = ReduceLROnPlateau(monitor='val_accuracy', patience = 2, verbose=1,factor=0.3, min_lr=0.000001)
# Train the model with class weights
history = model.fit(
    trainGen,
    epochs=NUMBER_OF_EPOCHS,
    validation_data=valGen,
    callbacks=[learning_rate_reduction,early_stopping]
   )



model.save('my_model.keras')

model.evaluate(testGen)