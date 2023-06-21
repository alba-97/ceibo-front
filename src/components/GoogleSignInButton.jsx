import { useEffect, useState } from "react";
import { styles } from "../styles/loginScreenStyles";
import { createNewUser } from "../services/createUser";
import { GenericButton } from "./GenericButton";
import { getUserPlans } from "../services/getUserPlans";
import { getUser } from "../services/getUser";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setUser, setUserPlans } from "../state/user";
import { API_URL, PORT } from "@env";

import * as ReactNative from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

WebBrowser.maybeCompleteAuthSession();

const GoogleSignInButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //Google
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "974579600414-23gn2jc5sb1hd1ul2bs0ujlplnbp0834.apps.googleusercontent.com",
    androidClientId:
      "974579600414-hdnoq57bclnqp9mackeqsnr3vs1hpga7.apps.googleusercontent.com",
    iosClientId:
      "974579600414-av4876t7gv6hfq2n9285unnnbmgohmi5.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setToken(response.authentication.accessToken);
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
      if (token && user) {
        await handleSignup(user);
        setUserInfo(user);
      }
    } catch (error) {
      console.log("get user info error", error);
    }
  };

  const handleSignup = async (user) => {
    try {
      const { email, given_name, family_name, picture, name } = user;
      const userPassword = token.toUpperCase().substring(0, 13);
      const userData = {
        username: name,
        password: userPassword,
        email: email,
        first_name: given_name,
        last_name: family_name,
        profile_img: picture,
      };
      await createNewUser(userData);
      await handleLogin(name, userPassword);
    } catch (error) {
      console.log("Error al hacer la petición:", error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const jwtToken = await axios.post(`${API_URL}:${PORT}/api/users/login`, {
        username: username,
        password: password,
      });
      if (jwtToken.data.token) {
        await AsyncStorage.setItem("token", jwtToken.data.token);
        await axios.get(`${API_URL}:${PORT}/api/users/secret`, {
          headers: {
            Authorization: `Bearer ${jwtToken.data.token}`,
          },
        });
        const userData = await getUser();
        dispatch(setUser(userData));
        const userPlans = await getUserPlans();
        dispatch(setUserPlans(userPlans));
        navigation.navigate(userData.new_user ? "Preferences" : "HomeScreen");
      }
    } catch (error) {
      console.error("handle login error", error);
    }
  };

  const onPressButton = async () => {
    try {
      if (token) {
        await getUserInfo();
      } else {
        await promptAsync();
      }
    } catch (error) {
      console.log("fallo onPress", error);
    }
  };

  return (
    <ReactNative.SafeAreaView>
      <ReactNative.View style={styles.inputContainer}>
        <GenericButton
          disabled={!request}
          onPress={onPressButton}
          text={token ? "login con google" : "signup con google"}
        />
      </ReactNative.View>
    </ReactNative.SafeAreaView>
  );
};

export default GoogleSignInButton;
