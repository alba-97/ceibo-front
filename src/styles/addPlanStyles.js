import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: "red",
  },
  content: {
    // borderWidth: 5,
    // borderColor: "green",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
  // borderWidth: 5,
  //   borderColor: "pink",
    width: "100%",
  flexDirection: "row",
  alignItems: "center",
     justifyContent: "space-evenly",
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
  },
  crearPlan: {
    alignItems: "center",
    flex: 1, 
    width: "65%",
    marginBottom: 15,
    marginTop: 15,
  },
  label: {
    paddingTop: 10,
    marginBottom: 4,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input2: {
    width: "65%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: 45,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 20,
  },
  text: {
    paddingTop: 10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
});
