import { View, StyleSheet } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Navbar } from "../components/Navbar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import AppScrollView from "@/components/AppScrollView";
import GenericButton from "@/components/GenericButton";
import createUser from "@/api/createUser";
import UserForm from "@/interfaces/forms/User";
import AppGradient from "@/components/AppGradient";
import { Formik } from "formik";
import registerInitialValues from "@/common/registerInitialValues";
import RegisterSchema from "@/utils/schema/RegisterSchema";
import TextField from "@/components/TextField";
import DateField from "@/components/DateField";
import ImageField from "@/components/ImageField";
import uploadImage from "@/api/uploadImage";
import { toast } from "react-toastify";

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSubmit = async (values: UserForm) => {
    try {
      if (values.profile_img) {
        const url = await uploadImage(values.profile_img);
        values.profile_img = url;
      }
      await createUser(values);
      toast.success("User added successfully");
      navigation.navigate("Login");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AppGradient style={styles.gradient}>
      <Navbar />
      <Formik
        initialValues={registerInitialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterSchema}
      >
        {({ handleSubmit }) => (
          <AppScrollView style={styles.scrollview}>
            <View style={styles.container}>
              <TextField field={"username"} placeholder="Username" />
              <TextField field={"email"} placeholder="Email" />
              <TextField field={"first_name"} placeholder="First name" />
              <TextField field={"last_name"} placeholder="Last name" />
              <TextField
                field={"password"}
                placeholder="Password"
                secureTextEntry
              />

              <DateField field={"birthdate"} placeholder="Birthdate" dateOnly />

              <TextField field={"address"} placeholder="Address" />
              <TextField field={"phone"} placeholder="Phone" />

              <ImageField placeholder="Profile photo" field="profile_img" />

              <GenericButton
                text="Create Account"
                onPress={handleSubmit}
                textStyle={styles.button}
              />
            </View>
          </AppScrollView>
        )}
      </Formik>
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  scrollview: {
    flex: 1,
    width: "100%",
  },
  button: {
    color: "white",
    fontSize: 30,
    fontFamily: "Melts",
    textShadowOffset: { width: 5, height: 5 },
    textShadowColor: "#770022",
  },
});
