import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default ProfilePicture = ({ imageSource }) => {
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
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
