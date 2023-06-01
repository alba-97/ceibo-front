import { View, Text, StyleSheet } from "react-native";

export default Navbar = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>EL CLUB DEL FUCKING PLAN</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: "white",
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginTop: 20,
    width: "100%",
    height: "14%",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
