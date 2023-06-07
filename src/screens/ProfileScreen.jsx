import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LoginScreen from "./LoginScreen";
import { useSelector } from "react-redux";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      {user._id ? (
        <View style={styles.container}>
          <Text style={styles.text}>{user?.username}</Text>
          <Text style={styles.text}>
            {user.first_name} {user?.last_name}
          </Text>
          <Text style={styles.text}>{user.email}</Text>
        </View>
      ) : (
        <LoginScreen />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
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
