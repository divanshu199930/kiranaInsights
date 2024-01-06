// useImageUploader.js
import { useState } from 'react';
import storage from '@react-native-firebase/storage';
import { firebase } from '@react-native-firebase/app';

const useImageUploader = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (imageUri, storeId, visitTime) => {
    try {
      setUploading(true);

      const reference = storage().ref(`images/${Date.now()}`);
      const task = reference.putFile(imageUri);

      await task;
      const downloadURL = await reference.getDownloadURL();

      // Save downloadURL and visitTime to Realtime Database under the store_visits node
      firebase.database().ref(`store_visits/${storeId}`).push({
        imageUrl: downloadURL,
        visitTime: visitTime,
      });

      setUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error.message);
      setUploading(false);
      throw error;
    }
  };

  return { uploading, uploadImage };
};

export default useImageUploader;
