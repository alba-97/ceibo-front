import React from "react";
import axios from "axios";
import { API_URL } from "../services/urls";
import { ScrollView, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import LoginScreen from "./LoginScreen";
// Components
import { ProfilePicture } from "../components/ProfilePicture";
import { GenericButton } from "../components/GenericButton";
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
      <Navbar />
      {user._id ? (
        <ScrollView>
          <View style={styles.container}>
            <ProfilePicture imageSource={"profile_img"} />
            <ChangeData
              keyboardType="default"
              baseData={user?.username}
              propName={"username"}
              dataUser={"Usuario"}
            />
            <ChangeData
              keyboardType="default"
              baseData={user?.first_name}
              propName={"first_name"}
              dataUser={"Nombre"}
            />
            <ChangeData
              keyboardType="default"
              baseData={user?.last_name}
              propName={"last_name"}
              dataUser={"Apellido"}
            />
            <ChangeData
              keyboardType="default"
              baseData={user?.address}
              propName={"address"}
              dataUser={"Direccion"}
            />
            <ChangeData
              keyboardType="email-address"
              baseData={user?.email}
              propName={"email"}
              dataUser={"Email"}
            />
            <ChangeData
              keyboardType="numeric"
              baseData={user?.phone}
              propName={"phone"}
              dataUser={"Telefono"}
            />
            <ChangeData
              keyboardType="date"
              baseData={user?.birthdate}
              propName={"birthdate"}
              dataUser={"Nacimiento"}
            />
            <View style={{ marginBottom: "5%" }} />
            <GenericButton onPress={handlePreferences} text="Preferencias" />
            <View style={{ marginBottom: "2%" }} />
            <GenericButton onPress={handleLogout} text="Logout" />
          </View>
        </ScrollView>
      ) : (
        <LoginScreen />
      )}
    </LinearGradient>
  );
}
