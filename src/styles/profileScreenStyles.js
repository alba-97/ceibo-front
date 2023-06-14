import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },

  container2: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
  },
  label: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 4,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input2: {
    paddingLeft:10,
    fontSize: 16,
    width: "80%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: 45,
    borderWidth: 1,
    borderColor: "white",
    borderRadius:18,
    color: "white",},
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
});
