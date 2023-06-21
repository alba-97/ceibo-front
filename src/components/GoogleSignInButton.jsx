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
//npm i -g eas-cli
//eas login
const GoogleSignInButton = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isUserInfoReady, setIsUserInfoReady] = useState(false);

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

  useEffect(() => {
    if (userInfo !== null) {
      console.log("soy user info password", userInfo.password);
      console.log("soy user info username", userInfo.username);

      handleLogin(userInfo.username, userInfo.password);
    }
  }, [userInfo]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      if (token) {
        await handleSignup(user);
        // setUserInfo(user);
        setIsUserInfoReady(true);
      }
    } catch (error) {
      console.log("get user info error", error);
    }
  };

  const handleSignup = async (user) => {
    try {
      console.log("soy user de handle signup", user);
      const userPassword = token.toUpperCase().substring(0, 9);
      const { email, given_name, family_name, picture, name } = user;
      const userData = {
        username: name,
        password: userPassword,
        email: email,
        first_name: given_name,
        last_name: family_name,
        profile_img: picture,
      };
      console.log("vengo de handle signup , soy userdata", userData);
      await createNewUser(userData);
      setUserInfo({ username: name, password: userPassword });
      // await handleLogin(name, userPassword);
    } catch (error) {
      console.log("Error al hacer la petición:", error);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      console.log("vengo de handle login", username, password);
      const jwtToken = await axios.post(`${API_URL}:${PORT}/api/users/login`, {
        username: username,
        password: password,
      });
      console.log("jwt token", jwtToken);
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
      // ReactNative.Alert.alert("Error", error.response.data, [{ text: "OK" }]);
    }
  };

  const handleLogout = () => {
    try {
      setToken("");
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
  };

  // const onPressButton = async () => {
  //   try {
  //     if (token) {
  //       await getUserInfo();
  //     } else {
  //       await promptAsync();
  //     }
  //   } catch (error) {
  //     console.log("fallo onPress", error);
  //   }
  // };

  const handlePrompt = async () => {
    await promptAsync();
    await getUserInfo();
  };
  const handleInfo = async () => {
    await handleLogin();
  };

  return (
    <>
      <ReactNative.View>
        <GenericButton
          disabled={!request}
          onPress={handlePrompt}
          text={"signIn with google"}
        />
      </ReactNative.View>
      <ReactNative.View>
        <GenericButton
          disabled={!request}
          onPress={handleInfo}
          text={"login with google"}
        />
      </ReactNative.View>
    </>
  );
};

export default GoogleSignInButton;
