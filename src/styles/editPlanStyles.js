import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  content: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 110,
  },
  date: {
    paddingTop: 10,
    paddingBottom: 10,
    width: "50%",
    textAlign: "center",
    marginBottom: 4,
  },
  container2: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
  },
  categoryContainer: {
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(225, 200, 200, 0.3)",
    borderColor: "rgba(10, 7, 7, 0.2)",
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
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
    color: "white",
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
