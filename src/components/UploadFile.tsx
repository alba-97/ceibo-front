import { useState } from "react";
import { Image, View } from "react-native";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  ImagePickerAsset,
} from "expo-image-picker";
import GenericButton from "./GenericButton";

interface IImagePickerProps {
  onChange: (url: string) => void;
}

const UploadImage = ({ onChange }: IImagePickerProps) => {
  const [image, setImage] = useState<ImagePickerAsset>();

  const pickImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const img = result.assets[0];
      setImage(img);
      onChange(img.uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GenericButton onPress={pickImage} text="Upload image" />
      {image && (
        <Image
          source={{ uri: image.uri }}
          style={{
            marginTop: 20,
            width: image.width,
            height: image.height,
          }}
        />
      )}
    </View>
  );
};

export default UploadImage;
