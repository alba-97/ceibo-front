import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import GenericButton from "../components/GenericButton";
import { styles } from "../styles/configurationStyles";
import { clearUser } from "../state/user";
import axios from "axios";
import { API_URL } from "@env";
import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function Configuration() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = () => {
    axios.post(`${API_URL}/users/logout`);
    AsyncStorage.removeItem("token");
    dispatch(clearUser());
  };

  const handleEdit = () => {
    navigation.navigate("EditProfile");
  };
  const handleEvent = () => {
    navigation.navigate("Login");
  };
  const handleContact = () => {
    navigation.navigate("Login");
  };
  const handleCategories = () => {
    navigation.navigate("Login");
  };
  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleEdit} style={styles.cubo}>
            <Text style={styles.text}>Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEvent} style={styles.cubo}>
            <Text style={styles.text}>Mis Eventos</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={handleContact} style={styles.cubo}>
            <Text style={styles.text}>Contactos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCategories} style={styles.cubo}>
            <Text style={styles.text}>Categorias Preferidas</Text>
          </TouchableOpacity>
        </View>
        <GenericButton
          customStyle={styles.text}
          onPress={handleLogout}
          text="Cerrar Sesion"
        />
      </View>
    </LinearGradient>
  );
}
