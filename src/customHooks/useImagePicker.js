import { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import useImageUploader from './useImageUploader';

const useImagePicker = () => {
  const [selectedImages, setSelectedImages] = useState([]);
const { uploading, uploadImage,} = useImageUploader()
const visitTime = new Date().toISOString();
  const openImagePicker = async (storeId) => {
    try {
      const response = await ImagePicker.openCamera({
        width: 800,
        height: 600,
        cropping: true,
      });

      if (response) {
        const newSelectedImages = [...selectedImages, response.path];
        setSelectedImages(newSelectedImages);
        uploadImage(response.path, storeId, visitTime)
        

      }
    } catch (error) {
      console.error('ImagePicker Error: ', error);
    }
  };

  return { selectedImages, openImagePicker, uploading };
};

export default useImagePicker;
