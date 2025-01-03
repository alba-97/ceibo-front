import {
  View,
  Text,
  ScrollView,
  Alert,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import axios from "axios";
import GenericInput from "../components/GenericInput";
import { API_URL } from "@env";
import { Navbar } from "../components/Navbar";
import { styles } from "../styles/registerScreenStyles";
import { DatePicker } from "../components/DatePicker";
import crearCuenta from "../assets/crearCuenta.png";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthdate, setBirthdate] = useState<Date | null>();
  const [address, setAddress] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    setBirthdate(birthdate);
  }, [birthdate]);

  const handleSubmit = async () => {
    let formattedBirthdate = null;
    if (birthdate instanceof Date) {
      formattedBirthdate = birthdate.toISOString();
    }
    try {
      const res = await axios.post(`${API_URL}/users/signup`, {
        username,
        password,
        email,
        phone,
        birthdate: formattedBirthdate,
        first_name,
        last_name,
        address,
      });
      Alert.alert("Hecho", res.data.message, [{ text: "OK" }]);
      navigation.navigate("Login");
      setUsername("");
      setPassword("");
      setEmail("");
      setPhone("");
      setBirthdate(null);
      setAddress("");
      setFirst_name("");
      setLast_name("");
    } catch (err) {
      handleError(err);
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

          <View style={styles.container2}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                value={first_name}
                style={styles.input2}
                onChangeText={setFirst_name}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}> Apellido</Text>
              <TextInput
                value={last_name}
                onChangeText={setLast_name}
                style={styles.input2}
              />
            </View>
          </View>

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
          <Text style={styles.text}>Fecha de nacimiento</Text>
          <DatePicker
            type="date"
            value={birthdate}
            onChange={(date) => setBirthdate(new Date(date))}
            placeholder="DD/MM/YYYY"
            customStyle={styles.birthdate}
          />
          <Text style={styles.text}>Direccion</Text>
          <GenericInput value={address} onChangeText={setAddress} />
          <Text style={styles.text}>Numero de telefono</Text>
          <GenericInput
            keyboardType={"numeric"}
            value={phone}
            onChangeText={setPhone}
          />

          <View style={styles.container2}>
            <View style={styles.crearCuenta}>
              <View style={styles.logoutContainer}>
                <TouchableOpacity onPress={handleSubmit}>
                  <Image style={styles.logo} source={crearCuenta} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
