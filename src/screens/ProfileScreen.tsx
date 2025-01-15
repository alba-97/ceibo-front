import axios from "axios";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import LoginScreen from "./LoginScreen";
import { ProfilePicture } from "../components/ProfilePicture";
import { API_URL } from "@env";
import { clearUser, updateUser } from "../state/user";
import { ChangeData } from "../components/ChangeData";
import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { RootState } from "@/state/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import AppScrollView from "@/components/AppScrollView";
import GenericButton from "@/components/GenericButton";

export default function ProfileScreen() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = () => {
    axios.post(`${API_URL}/users/logout`);
    AsyncStorage.removeItem("token");
    dispatch(clearUser());
  };

  const handlePreferences = () => {
    navigation.navigate("Preferences");
  };

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const path = result.assets?.[0].uri;
      if (token && path) {
        if (path !== "") {
          const formData = new FormData();
          const blob = await fetch(path).then((response) => response.blob());
          formData.append("image", blob, "image.jpg");
          const response = await axios.post(`${API_URL}/upload`, formData);
          await axios.put(
            `${API_URL}/users/`,
            {
              profile_img: response.data.imageUrl,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(updateUser({ profile_img: response.data.imageUrl }));
          Alert.alert("Hecho", "Imagen de perfil actualizada correctamente");
        }
      }
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
      {user._id ? (
        <View style={styles.container}>
          <Navbar />
          <AppScrollView style={{ width: "100%", paddingHorizontal: 30 }}>
            <View style={styles.imageContainer}>
              {user.profile_img ? (
                <TouchableOpacity onPress={selectImage}>
                  <ProfilePicture imageSource={user.profile_img} />
                </TouchableOpacity>
              ) : (
                <GenericButton
                  onPress={selectImage}
                  buttonStyle={styles.button}
                  textStyle={styles.buttonText}
                  text={"Seleccionar imagen"}
                />
              )}
            </View>
            <ChangeData
              keyboardType="default"
              baseData={user?.username}
              propName={"username"}
              data={"Usuario"}
              mode={"user"}
            />
            <ChangeData
              keyboardType="default"
              baseData={user?.first_name}
              propName={"first_name"}
              data={"Nombre"}
              mode={"user"}
            />
            <ChangeData
              keyboardType="default"
              baseData={user?.last_name}
              propName={"last_name"}
              data={"Apellido"}
              mode={"user"}
            />
            <ChangeData
              keyboardType="default"
              baseData={user?.address}
              propName={"address"}
              data={"Direccion"}
              mode={"user"}
            />
            <ChangeData
              keyboardType="email-address"
              baseData={user?.email}
              propName={"email"}
              data={"Email"}
              mode={"user"}
            />
            <ChangeData
              keyboardType="numeric"
              baseData={user?.phone}
              propName={"phone"}
              data={"Telefono"}
              mode={"user"}
            />
            <ChangeData
              keyboardType="numeric"
              baseData={user?.birthdate}
              propName={"birthdate"}
              data={"Nacimiento"}
              mode={"user"}
            />

            <TouchableOpacity
              onPress={handlePreferences}
              style={styles.buttonContainer}
            >
              <Text style={styles.logoText}>Preferencias</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleLogout}
              style={styles.buttonContainer}
            >
              <Text style={styles.logoText}>Cerrar sesion</Text>
            </TouchableOpacity>
          </AppScrollView>
        </View>
      ) : (
        <LoginScreen />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  logoText: {
    fontFamily: "Melts",
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowColor: "#770022",
    marginBottom: 20,
    marginTop: 30,
    fontSize: 40,
  },
  button: {
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#7D0166",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    borderWidth: 1,
    borderColor: "white",
    color: "#fff",
    textAlign: "center",
  },
  buttonContainer: {
    marginVertical: 20,
    borderRadius: 25,
    alignItems: "center",
    width: "75%",
    backgroundColor: "#22001b",
  },
});
