import { View, Image, StyleSheet } from "react-native";

const defaultAvatar = require("../assets/images/profile-img.svg");

interface IProfilePictureProps {
  imageSource: string;
}

export default ({ imageSource }: IProfilePictureProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={imageSource ? { uri: imageSource } : defaultAvatar}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 18,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
});
