import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { GenericInput } from "../components/GenericInput";
import { GenericButton } from "../components/GenericButton";
import { LinearGradient } from "expo-linear-gradient";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { API_URL, PORT } from "@env";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${API_URL}:${PORT}/api/users/signup`, {
        username: username,
        password: password,
        email: email,
        phone: phone,
      });
      Alert.alert(res.data.status, res.data.message, [{ text: "OK" }]);
    } catch (error) {
      Alert.alert("Error", "Inténtelo más tarde", [{ text: "OK" }]);
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
        <View style={styles.container}>
          <Text style={styles.text}>Nombre de Usuario</Text>
          <GenericInput value={username} onChangeText={setUsername} />
          <Text style={styles.text}>Contraseña</Text>
          <GenericInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <Text style={styles.text}>Email</Text>
          <GenericInput
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.text}>Numero de telefono</Text>
          <GenericInput value={phone} onChangeText={setPhone} />

          <View style={styles.container2}>
            <View style={styles.inputContainer}>
              <GenericButton onPress={handleSubmit} text={"Crear Cuenta"} />
            </View>
            <View style={styles.inputContainer}>
              <GenericButton text={"Home"} />
            </View>
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

  scroll: {
    flex: 1,
    width: "100%",
  },

  container2: {
    paddingTop: "10%",
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputContainer: {
    alignItems: "center",
    flex: 1,
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
});
