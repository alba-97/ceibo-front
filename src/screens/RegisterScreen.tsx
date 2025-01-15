import { View, Alert, StyleSheet } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { Navbar } from "../components/Navbar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import AppScrollView from "@/components/AppScrollView";
import GenericButton from "@/components/GenericButton";
import createUser from "@/api/createUser";
import RegisterForm from "@/interfaces/forms/User";
import AppGradient from "@/components/AppGradient";
import { Formik } from "formik";
import registerInitialValues from "@/common/registerInitialValues";
import RegisterSchema from "@/utils/schema/RegisterSchema";
import TextField from "@/components/TextField";
import DateField from "@/components/DateField";

export default function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSubmit = async (values: RegisterForm) => {
    try {
      const { data } = await createUser(values);
      Alert.alert("Hecho", data.message, [{ text: "OK" }]);
      navigation.navigate("Login");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AppGradient style={styles.container}>
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
              <TextField field={"first_name"} placeholder="First name" />
              <TextField field={"last_name"} placeholder="Last name" />
              <TextField field={"password"} placeholder="Password" />

              <DateField field={"birthdate"} placeholder="Birthdate" />

              <TextField field={"address"} placeholder="Address" />
              <TextField field={"phone"} placeholder="Phone" />

              <GenericButton
                text="Crear Cuenta"
                onPress={handleSubmit}
                textStyle={{
                  color: "white",
                  fontSize: 30,
                  fontFamily: "Melts",
                  textShadowOffset: { width: 5, height: 5 },
                  textShadowColor: "#770022",
                }}
              />
            </View>
          </AppScrollView>
        )}
      </Formik>
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  scrollview: {
    flex: 1,
    width: "100%",
  },
});
