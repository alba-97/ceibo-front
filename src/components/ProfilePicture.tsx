import { View, Image } from "react-native";
import { styles } from "../styles/profilePictureStyles";

interface IProfilePictureProps {
  imageSource: string;
}

export const ProfilePicture = ({ imageSource }: IProfilePictureProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.image} />
    </View>
  );
};
