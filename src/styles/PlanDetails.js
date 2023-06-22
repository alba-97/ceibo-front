import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    paddingTop: 50,
    backgroundColor: "transparent",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    height: "100%",
    flex: 1,
  },
  item: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  dropdown: {
    color: "white",
    backgroundColor: "rgba(225, 200, 200, 0.3)",
    borderRadius: 20,
    paddingVertical: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    padding: 10,
    margin: 5,
    textAlign: "center",
  },
  p: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  input: {
    alignItems: "center",
  },
  username: {
    fontSize: 18,
    color: "#fff",
    paddingHorizontal: 10,
    margin: 10,
  },
  comment: {
    fontSize: 14,
    color: "#fff",
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "rgba(225, 200, 200, 0.3)",
    borderRadius: 20,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(10, 7, 7, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: "80%",
  },
  img: {
    width: "100%",
  },
});
