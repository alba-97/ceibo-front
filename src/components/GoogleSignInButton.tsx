import { useEffect, useState } from "react";
import { styles } from "../styles/loginScreenStyles";
import createNewUser from "../api/createUser";
import getUserPlans from "../api/getUserPlans";
import getUser from "../api/getUser";
import { useDispatch } from "react-redux";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { setUser, setUserPlans } from "../state/user";
import {
  API_URL,
  EXPO_CLIENT_ID,
  IOS_CLIENT_ID,
  ANDROID_CLIENT_ID,
} from "@env";
import iniciarConGoogle from "../assets/iniciarConGoogle.png";

import * as ReactNative from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import GoogleUser from "@/interfaces/Google";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignInButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  //Google
  const [isUserInfoFetched, setIsUserInfoFetched] = useState(false);
  const [token, setToken] = useState("");
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: EXPO_CLIENT_ID,
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
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();

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
      const { data } = await getUserPlans();
      dispatch(setUserPlans(data));
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
    <ReactNative.SafeAreaView style={{ width: "100%", alignItems: "center" }}>
      <ReactNative.View style={styles.googleContainer}>
        <ReactNative.TouchableOpacity
          disabled={!request}
          onPress={onPressButton}
        >
          <ReactNative.Image
            style={styles.logoGoogle}
            source={iniciarConGoogle}
          />
        </ReactNative.TouchableOpacity>
      </ReactNative.View>
    </ReactNative.SafeAreaView>
  );
};

export default GoogleSignInButton;
