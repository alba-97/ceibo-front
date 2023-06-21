import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, View } from "react-native";
import { API_URL } from "../services/urls";
import LoginScreen from "./LoginScreen";
import axios from "axios";
import React from "react";
// Components
import { ProfilePicture } from "../components/ProfilePicture";
import { GenericButton } from "../components/GenericButton";
import { styles } from "../styles/profileScreenStyles";
import { useNavigation } from "@react-navigation/core";
import { ChangeData } from "../components/ChangeData";
import { Navbar } from "../components/Navbar";
import { clearUser } from "../state/user";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    axios.post(`${API_URL}/api/users/logout`);
    AsyncStorage.removeItem("token");
    dispatch(clearUser());
  };

  const handlePreferences = () => {
    navigation.navigate("Preferences");
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      {user._id ? (
        <>
          <Navbar />
          <ScrollView>
            <View style={styles.container}>
              <ProfilePicture imageSource={"profile_img"} />
              <ChangeData
                keyboardType="default"
                baseData={user?.username}
                propName={"username"}
              />
              <ChangeData
                keyboardType="default"
                baseData={user?.first_name}
                propName={"first_name"}
              />
              <ChangeData
                keyboardType="default"
                baseData={user?.last_name}
                propName={"last_name"}
              />
              <ChangeData
                keyboardType="default"
                baseData={user?.address}
                propName={"address"}
              />
              <ChangeData
                keyboardType="email-address"
                baseData={user?.email}
                propName={"email"}
              />
              <ChangeData
                keyboardType="numeric"
                baseData={user?.phone}
                propName={"phone"}
              />
              <ChangeData
                keyboardType="date"
                baseData={user?.birthdate}
                propName={"birthdate"}
              />
              <View style={{ marginBottom: "5%" }} />
              <GenericButton onPress={handlePreferences} text="Preferencias" />
              <View style={{ marginBottom: "2%" }} />
              <GenericButton onPress={handleLogout} text="Logout" />
            </View>
          </ScrollView>
        </>
      ) : (
        <LoginScreen />
      )}
    </LinearGradient>
  );
}
