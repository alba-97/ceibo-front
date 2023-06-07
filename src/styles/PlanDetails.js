import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    paddingTop: 50,
    backgroundColor: "transparent",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    padding: 10,
    margin: 10,
    textAlign: "center",
  },
  detailsContainer: {
    padding: 20,
  },
  addButton: {
    margin: 10,
    backgroundColor: "#7D0166",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
