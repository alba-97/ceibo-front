import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import LoginScreen from "./LoginScreen";
import { useSelector, useDispatch } from "react-redux";
import { GenericButton } from "../components/GenericButton";
import axios from "axios";
import { API_URL, PORT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { clearUser } from "../state/user";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = () => {
    axios.post(`${API_URL}:${PORT}/api/users/logout`);
    AsyncStorage.removeItem("token");
    dispatch(clearUser());
  };

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
          <GenericButton onPress={handleLogout} text="Logout" />
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
