import cv2
import face_recognition
import numpy as np
import os
from facenet_pytorch import MTCNN, InceptionResnetV1
from scipy.spatial.distance import euclidean

# Path to the folder containing the images to compare
folder_path = "photo/"

# Create a FaceNet model
facenet_model = InceptionResnetV1(pretrained='vggface2').eval()

# Create an MTCNN for face detection
mtcnn = MTCNN()

# Load all the images in the folder and get their embeddings
known_images = []
known_image_names = []
known_image_embeddings = []
for filename in os.listdir(folder_path):
    image_path = os.path.join(folder_path, filename)
    image = face_recognition.load_image_file(image_path)
    known_images.append(image)
    known_image_names.append(os.path.splitext(filename)[0])
    known_image_cropped = mtcnn(image)
    known_image_embedding = facenet_model(known_image_cropped.unsqueeze(0))
    known_image_embeddings.append(known_image_embedding)

# Initialize the webcam
cap = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Find all the faces and face encodings in the current frame
    face_locations = face_recognition.face_locations(frame)

    for (top, right, bottom, left) in face_locations:
        # Extract the face from the frame
        face = frame[top:bottom, left:right]

        # Preprocess the face and get its embedding
        face_cropped = mtcnn(face)
        if face_cropped is not None:
            face_embedding = facenet_model(face_cropped.unsqueeze(0))

            # Calculate the Euclidean distance between the known images and the face
            distances = []
            for i, known_image_embedding in enumerate(known_image_embeddings):
                distance = euclidean(np.squeeze(known_image_embedding.detach().numpy()), np.squeeze(face_embedding.detach().numpy()))
                distances.append(distance)

            print(distance)

            # Check if the minimum distance is below a certain threshold (e.g., 0.6)
            if min(distances) < 0.6:
                match_index = np.argmin(distances)
                match_name = known_image_names[match_index]
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 255, 0), 2)
                cv2.putText(frame, match_name, (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            else:
                cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
                cv2.putText(frame, "Not Match", (left, top - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

    # Display the resulting frame
    cv2.imshow('Facial Recognition', frame)

    # Exit the loop when 'q' key is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the capture and close the window
cap.release()
cv2.destroyAllWindows()