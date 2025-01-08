import { Image, StyleSheet, View } from "react-native";
import logo from "../assets/logo.png";

export const Navbar = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: "center",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: "100%",
  },
  image: {
    width: 160,
    height: 75,
  },
});
