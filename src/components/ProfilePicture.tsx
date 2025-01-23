import { View, Image, StyleSheet } from "react-native";

interface IProfilePictureProps {
  imageSource: string;
}

export default ({ imageSource }: IProfilePictureProps) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageSource }} style={styles.image} />
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
