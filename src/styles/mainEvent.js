import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    marginTop: 20,
    position: "relative",
    alignItems: "center",
  },
  image: {
    margin: 20,
    width: 370,
    height: 150,
  },
  overlay: {
    margin: 20,
    position: "absolute",
    height: 150,
    width: 370,
    justifyContent: "flex-end",
    backgroundColor: "#0004",
  },
  text: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: 600,
    marginLeft: 7,
  },
  textFecha: {
    marginLeft: 7,
    marginBottom: 10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: 500,
  },
});
