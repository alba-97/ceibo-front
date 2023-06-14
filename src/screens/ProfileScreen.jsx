import React, { useContext } from "react";
import moment from "moment";
import { View, ScrollView } from "react-native";
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

import axios from "axios";
import { API_URL, PORT } from "@env";
import { SharedRefetchContext } from "../sharedRefetchContext";
import { useNavigation } from "@react-navigation/core";

export default function ProfileScreen() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const formattedBirthdate = moment(user.birthdate).format("DD/MM/YYYY");
  const fullName = `${user.first_name} ${user.last_name}`;

  const { refetch, triggerRefetch } = useContext(SharedRefetchContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await axios.post(`${API_URL}:${PORT}/api/users/logout`);
    AsyncStorage.removeItem("token");
    dispatch(clearUser());
    triggerRefetch();
  };

  const handlePreferences = async () => {
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
        <ScrollView>
          <View style={styles.container}>
            <ProfilePicture imageSource={"profile_img"} />
            <ProfileText style={styles.text} text={user?.username} />
            {fullName && <ProfileText style={styles.text} text={fullName} />}
            {formattedBirthdate && (
              <ProfileText style={styles.text} text={formattedBirthdate} />
            )}
            {user.phone && (
              <ProfileText style={styles.text} text={user?.phone} />
            )}
            <ProfileText style={styles.text} text={user?.email} />
            {user.address && (
              <ProfileText style={styles.text} text={user.address} />
            )}
            <GenericButton
              onPress={handlePreferences}
              text="Editar preferencias"
            />
            <GenericButton onPress={handleLogout} text="Cerrar sesión" />
          </View>
        </ScrollView>
      ) : (
        <LoginScreen />
      )}
    </LinearGradient>
  );
}
