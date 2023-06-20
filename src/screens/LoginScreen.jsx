//Native
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import axios from "axios";
import { getUser } from "../services/getUser";
import { getUserPlans } from "../services/getUserPlans";
// Components
import { GenericButton } from "../components/GenericButton";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/loginScreenStyles";
import { setUser, setUserPlans } from "../state/user";
import { API_URL, PORT } from "@env";
import GoogleSignInButton from "../components/GoogleSignInButton";

export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}:${PORT}/api/users/login`, {
        username,
        password,
      });
      if (res.data.token) {
        await AsyncStorage.setItem("token", res.data.token);
        await axios.get(`${API_URL}:${PORT}/api/users/secret`, {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        });
        const userData = await getUser();
        dispatch(setUser(userData));
        const userPlans = await getUserPlans();
        dispatch(setUserPlans(userPlans));
        navigation.navigate(userData.new_user ? "Preferences" : "HomeScreen");
      }
    } catch (error) {
      Alert.alert("Error", error.response.data, [{ text: "OK" }]);
    }
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Text style={styles.text}>Nombre de Usuario</Text>
          <GenericInput value={username} onChangeText={setUsername} />
          <Text style={styles.text}>Contraseña</Text>
          <GenericInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <View style={styles.inputContainer}>
            <GenericButton onPress={handleLogin} text={"Iniciar Sesion"} />
            <Text style={styles.text} onPress={handleSignup}>
              ¿No tienes cuenta? Crea una
            </Text>
          </View>
          <GoogleSignInButton />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
