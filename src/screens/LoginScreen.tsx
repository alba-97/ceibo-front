import { View, Text, StyleSheet } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import getUserEvents from "../api/getUserEvents";
import { setCreatedEvents, setUser, setUserEvents } from "../state/user";
import { Navbar } from "../components/Navbar";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import handleError from "@/utils/handleError";
import AppScrollView from "@/components/AppScrollView";
import login from "@/api/login";
import AppGradient from "@/components/AppGradient";
import { Formik } from "formik";
import { ProfileText } from "@/components/ProfileText";
import TextField from "@/components/TextField";
import LoginSchema from "@/utils/schema/LoginSchema";
import LoginForm from "@/interfaces/forms/Login";
import GenericButton from "@/components/GenericButton";
import { setRefresh } from "@/state/common";
import loginInitialValues from "@/common/loginInitialValues";
import getPastEvents from "../api/getCreatedEvents";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSignup = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async (values: LoginForm) => {
    try {
      const { user, token } = await login(values);
      if (!token) return;
      dispatch(setUser(user));

      const { data: userEvents } = await getUserEvents();
      dispatch(setUserEvents(userEvents));

      const { data: pastEvents } = await getPastEvents();
      dispatch(setCreatedEvents(pastEvents));

      dispatch(setRefresh());
      navigation.navigate("HomeScreen");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AppGradient style={styles.container}>
      <Navbar />
      <Formik
        initialValues={loginInitialValues}
        onSubmit={handleLogin}
        validationSchema={LoginSchema}
      >
        {({ handleSubmit }) => (
          <AppScrollView style={styles.scrollView}>
            <ProfileText text="Login" />
            <View style={styles.form}>
              <TextField placeholder="Username" field="username" />
              <TextField
                placeholder="Password"
                field="password"
                secureTextEntry={true}
                onSubmitEditing={handleSubmit}
              />
            </View>

            <GenericButton
              text="Login"
              onPress={() => handleSubmit()}
              textStyle={styles.loginButton}
            />
            <View style={styles.container}>
              <Text style={styles.text} onPress={handleSignup}>
                Don't have an account? Create one
              </Text>
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
  scrollView: {
    flex: 1,
    width: "100%",
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    width: "100%",
  },
  loginButton: {
    fontFamily: "Melts",
    fontSize: 30,
    color: "white",
    textShadowOffset: { width: 5, height: 5 },
    textShadowColor: "#770022",
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
