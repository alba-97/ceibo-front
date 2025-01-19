import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./LoginScreen";
import { clearUser, updateUser } from "../state/user";
import { ChangeData } from "../components/ChangeData";
import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { launchImageLibraryAsync } from "expo-image-picker";
import { Alert } from "react-native";
import { RootState } from "@/state/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import AppScrollView from "@/components/AppScrollView";
import AppGradient from "@/components/AppGradient";
import { Formik } from "formik";
import RegisterSchema from "@/utils/schema/RegisterSchema";
import InteractiveProfilePicture from "@/components/InteractiveProfilePicture";
import UserForm from "@/interfaces/forms/User";
import fromResponseToForm from "@/utils/user/fromResponseToForm";
import editUser from "@/api/editUser";
import uploadImage from "@/api/uploadImage";

export default function ProfileScreen() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = () => {
    AsyncStorage.removeItem("token");
    dispatch(clearUser());
  };

  const handlePreferences = () => {
    navigation.navigate("Preferences");
  };

  const selectImage = async () => {
    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    try {
      const token = await AsyncStorage.getItem("token");
      const path = result.assets?.[0].uri;
      if (!path || !token) return;

      const profile_img = await uploadImage(path);
      await editUser({ profile_img });

      dispatch(updateUser({ profile_img }));
      Alert.alert("Done", "Profile image updated successfully");
    } catch (err) {
      handleError(err);
    }
  };

  const handleEdit = async (values: UserForm) => {
    try {
      await editUser(values);
      dispatch(updateUser(values));
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AppGradient style={styles.container}>
      {user._id ? (
        <View style={styles.container}>
          <Navbar />
          <Formik
            initialValues={fromResponseToForm(user)}
            onSubmit={handleEdit}
            validationSchema={RegisterSchema}
          >
            <AppScrollView style={styles.scrollview}>
              <View style={styles.imageContainer}>
                <InteractiveProfilePicture
                  onPress={selectImage}
                  url={user.profile_img}
                />
              </View>
              <ChangeData type="text" field={"username"} data={"Username"} />
              <ChangeData
                type="text"
                field={"first_name"}
                data={"First name"}
              />
              <ChangeData type="text" field={"last_name"} data={"Last name"} />
              <ChangeData type="text" field={"address"} data={"Address"} />
              <ChangeData type="text" field={"email"} data={"Email"} />
              <ChangeData type="text" field={"phone"} data={"Phone"} />
              <ChangeData type="date" field={"birthdate"} data={"Birthdate"} />

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
          </Formik>
        </View>
      ) : (
        <LoginScreen />
      )}
    </AppGradient>
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
  scrollview: { width: "100%", paddingHorizontal: 30 },
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
  buttonContainer: {
    marginVertical: 20,
    borderRadius: 25,
    alignItems: "center",
    width: "75%",
    backgroundColor: "#22001b",
  },
});
