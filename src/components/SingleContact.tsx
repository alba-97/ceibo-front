import { Dimensions, StyleSheet, Text, View } from "react-native";

interface ISingleContactProps {
  phone: string;
  username: string;
}

const windowWidth = Dimensions.get("window").width;

export default ({ phone, username }: ISingleContactProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.phone}>{phone}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 20,
  },
  username: {
    color: "#fff",
    position: "absolute",
    left: "5%",
    fontWeight: "bold",
    fontSize: 18,
  },
  phone: {
    color: "#fff",
    position: "absolute",
    left: "70%",
    right: "5%",
    fontWeight: "bold",
    fontSize: 15,
  },
});
