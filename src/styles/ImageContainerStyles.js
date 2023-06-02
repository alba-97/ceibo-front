import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
  container: {
    borderRadius: 30,

    borderColor: "white",
    borderWidth: 1,

    borderStyle: "solid",
    position: "relative",
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 30,
  },
  overlay: {
    borderRadius: 30,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  text: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
  },
  textFecha: {
    marginBottom: 10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
  },
});
