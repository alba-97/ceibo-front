import { useEffect, useState } from "react";
import createNewUser from "../api/createUser";
import getUserEvents from "../api/getUserEvents";
import getUser from "../api/getUser";
import { useDispatch } from "react-redux";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { setUser, setUserEvents } from "../state/user";
import {
  API_URL,
  EXPO_CLIENT_ID,
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
} from "@env";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import GoogleUser from "@/interfaces/Google";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import getGoogleUser from "@/api/getGoogleUser";
import { SafeAreaView, StyleSheet, View } from "react-native";
import GenericButton from "./GenericButton";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignInButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const [isUserInfoFetched, setIsUserInfoFetched] = useState(false);
  const [token, setToken] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: EXPO_CLIENT_ID,
    androidClientId: IOS_CLIENT_ID,
    iosClientId: ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success" && response.authentication) {
      setToken(response.authentication.accessToken);
      if (!isUserInfoFetched) {
        getUserInfo();
      }
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const user = await getGoogleUser(token);

      const checkExistingUsers = await axios.post(
        `${API_URL}/users/find-email`,
        {
          email: user.email,
        }
      );

      if (!checkExistingUsers?.data) {
        await handleSignup(user);
        await handleLogin(user.name, "Prueba1234");
      } else {
        await handleLogin(user.name, "Prueba1234");
      }
      setIsUserInfoFetched(true);
    } catch (err) {
      handleError(err);
    }
  };

  const handleSignup = async (user: GoogleUser) => {
    try {
      const { email, given_name, family_name, picture, name } = user;
      const userData = {
        username: name,
        password: "Prueba1234",
        email: email,
        first_name: given_name,
        last_name: family_name,
        profile_img: picture,
        address: "",
        phone: "",
        birthdate: "",
      };
      await createNewUser(userData);
    } catch (err) {
      handleError(err);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const jwtToken = await axios.post(`${API_URL}/users/login`, {
        username: username,
        password: password,
      });
      if (!jwtToken.data.token) return;

      await AsyncStorage.setItem("token", jwtToken.data.token);
      await axios.get(`${API_URL}/users/secret`, {
        headers: {
          Authorization: `Bearer ${jwtToken.data.token}`,
        },
      });
      const userData = await getUser();
      dispatch(setUser(userData));
      const { data } = await getUserEvents();
      dispatch(setUserEvents(data));
      navigation.navigate(userData.new_user ? "Preferences" : "HomeScreen");
    } catch (err) {
      handleError(err);
    }
  };

  const onPressButton = async () => {
    try {
      await promptAsync();
      await getUserInfo();
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <GenericButton
          disabled={!request}
          onPress={onPressButton}
          textStyle={styles.button}
          text={"Iniciar sesion con Google"}
        />
      </View>
    </SafeAreaView>
  );
};

export default GoogleSignInButton;

const styles = StyleSheet.create({
  safeAreaView: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  button: {
    fontFamily: "Melts",
    fontSize: 30,
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowColor: "#770022",
  },
});
