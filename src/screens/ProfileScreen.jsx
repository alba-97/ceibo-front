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
import ProfileText from "../components/ProfileText";
import ProfilePicture from "../components/ProfilePicture";
import moment from "moment";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formattedBirthdate = moment(user.birthdate).format("DD/MM/YYYY");
  const fullName = `${user.first_name} ${user.last_name}`;

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
          {/* <ProfilePicture imageSource={"profile_img"}/> */}
          <ProfileText style={styles.text} text={user?.username} />
          <ProfileText style={styles.text} text={fullName} />
          <ProfileText style={styles.text} text={formattedBirthdate} />
          <ProfileText style={styles.text} text={user.phone} />
          <ProfileText style={styles.text} text={user.email} />
          <ProfileText style={styles.text} text={user.address} />
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
