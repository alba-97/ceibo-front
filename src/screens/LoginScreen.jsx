import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { GenericInput } from "../components/GenericInput";
import { GenericButton } from "../components/GenericButton";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { API_URL, PORT } from "@env";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState({});

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
        const user = await axios.get(`${API_URL}:${PORT}/api/users/secret`, {
          headers: {
            Authorization: `Bearer ${res.data.token}`,
          },
        });
        if (user.status == 200) {
          setUser(user.data);
        }
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
        <Navbar />
        <Text style={styles.text}>
          {user.username && "Estas logueado como " + user.username}
        </Text>
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
            <Text style={styles.text}>
              ¿No tienes cuenta?
              <Text onPress={handleSignup}>
                <Text style={styles.text}> Crea una</Text>
              </Text>
            </Text>
            <Text></Text>
          </View>
          <View style={styles.inputContainer}>
            <GenericButton text={"Ingresar con Google"} />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
    paddingTop: "10%",
    width: "70%",
  },
  scroll: {
    flex: 1,
    width: "100%",
    paddingTop: "10%",
  },
  text: {
    paddingTop: 10,
    paddingBottom: 10,
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 4,
  },
  text2: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
