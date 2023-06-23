import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    paddingTop: 25,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
  input: {
    justifyContent: "center",
    flexDirection: "row",
  },

  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    color: "#fff",
  },
  detailsContainer: { justifyContent: "center", marginTop: 5 },
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
    height: 40,
    width: 80,
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
    // paddingHorizontal: 10,
    // margin: 10,
  },
  comment: {
    fontSize: 14,
    color: "#fff",
    // paddingHorizontal: 10,
    // marginHorizontal: 10,
  },
  detailsContainer: {
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    width: 80,
    right: 0,
    top: -35,
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
  item: {
    color: "#fff",
  },
  dropdown: {
    backgroundColor: "#0004",
    right: 20,
    zIndex: 10,
  },
  commentContainer:{
    borderRadius: 20,
    backgroundColor:"rgba(225, 200, 200, 0.3)",
    marginBottom:5,
    marginTop:10,

  }
});
