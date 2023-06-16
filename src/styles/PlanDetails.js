import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    paddingTop: 25,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    flexDirection: "row",
    alignContent: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 500,
    color: "#fff",
  },
  text: {
    fontWeight: 300,
    fontSize: 20,
    color: "#fff",
  },
  p: {
    fontSize: 18,
    color: "#fff",
  },
  button: {
    right: 0,
    width: 100,
    borderRadius: 5,
    padding: 0,
  },
  button2: {
    width: 112,
    paddingHorizontal: 0,
    borderRadius: 5,
  },
  username: {
    fontSize: 18,
    color: "#fff",
  },
  comment: {
    fontSize: 14,
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    right: 0,
  },
  inputCont: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    width: 80,
    height: 50,
    borderRadius: 5,
  },
});
