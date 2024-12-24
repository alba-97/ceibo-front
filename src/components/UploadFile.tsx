import { useState } from "react";
import { Button, Image, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { API_URL } from "@env";

interface IImageResponse {
  imageUrl: string;
}

interface IImagePickerProps {
  onChange: (url: string) => void;
}

const UploadImage = ({ onChange }: IImagePickerProps) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const uploadImage = async (uri: string) => {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    const fileUri = fileInfo.uri;
    const fileName = fileUri.split("/").pop();

    const response = await fetch(fileUri);
    const blob = await response.blob();

    const formData = new FormData();
    formData.append("image", blob, fileName || "upload.jpg");

    try {
      const { data } = await axios.post<IImageResponse>(
        `${API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onChange(data.imageUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await uploadImage(uri);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Upload image" onPress={pickImage} />
      {imageUri && (
        <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
};

export default UploadImage;
