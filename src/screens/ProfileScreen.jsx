import React from "react";
import axios from "axios";
import moment from "moment";
import { API_URL, PORT } from "@env";
import { ScrollView, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import LoginScreen from "./LoginScreen";
// Components
import { ProfilePicture } from "../components/ProfilePicture";
import { GenericButton } from "../components/GenericButton";
import { ProfileText } from "../components/ProfileText";
import { styles } from "../styles/profileScreenStyles";
import { clearUser } from "../state/user";
import { ChangeData } from "../components/ChangeData";
import { Navbar } from "../components/Navbar";
import { useNavigation } from "@react-navigation/core";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    axios.post(`${API_URL}:${PORT}/api/users/logout`);
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
      <Navbar />
      <ScrollView>
        {user._id ? (
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

            <GenericButton
              style={styles.logout}
              onPress={handlePreferences}
              text="Preferencias"
            />

            <GenericButton
              style={styles.logout}
              onPress={handleLogout}
              text="Logout"
            />
          </View>
        ) : (
          <LoginScreen />
        )}
      </ScrollView>
    </LinearGradient>
  );
}
