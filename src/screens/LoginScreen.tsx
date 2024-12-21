import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, ScrollView, Alert, TouchableOpacity } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { getUser } from "../api/getUser";
import { getUserPlans } from "../api/getUserPlans";
import { GenericInput } from "../components/GenericInput";
import { styles } from "../styles/loginScreenStyles";
import { setPlanHistory, setUser, setUserPlans } from "../state/user";
import { API_URL } from "@env";
import { Navbar } from "../components/Navbar";
import { getPlanHistory } from "../api/getPlanHistory";
import iniciaSesion from "../assets/iniciaSesion.png";
import { Image } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function LoginScreen() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSignup = () => {};

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/users/login`, {
        username,
        password,
      });
      if (res.data.token) {
        await AsyncStorage.setItem("token", res.data.token);
        await axios.get(`${API_URL}/users/secret`, {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        });
        const userData = await getUser();
        dispatch(setUser(userData));
        const userPlans = await getUserPlans();
        dispatch(setUserPlans(userPlans));
        const planHistory = await getPlanHistory();
        dispatch(setPlanHistory(planHistory));
        navigation.navigate("HomeScreen");
      }
    } catch (error) {
      if (error instanceof AxiosError)
        Alert.alert("Error", error.response?.data, [{ text: "OK" }]);
    }
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
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
            <View style={styles.logoutContainer}>
              <TouchableOpacity onPress={handleLogin}>
                <Image style={styles.logo} source={iniciaSesion} />
              </TouchableOpacity>
            </View>

            <Text style={styles.text} onPress={handleSignup}>
              ¿No tienes cuenta? Crea una
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
