import { StyleSheet, Text, View } from "react-native";

export const Navbar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>The Event Network</Text>
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
  title: {
    textAlign: "center",
    fontFamily: "Melts",
    fontSize: 40,
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowColor: "#770022",
  },
});
