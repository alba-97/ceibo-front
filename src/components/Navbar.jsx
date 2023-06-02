import { View, Text, StyleSheet, Image } from "react-native";
import logo from "../assets/logo.png";

export const Navbar = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} />
      <View style={{ width: 600, height: 2, backgroundColor: "white" }}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    alignItems: "center",
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
