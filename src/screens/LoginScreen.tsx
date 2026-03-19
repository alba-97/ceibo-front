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
import TextField from "@/components/TextField";
import LoginSchema from "@/utils/schema/LoginSchema";
import LoginForm from "@/interfaces/forms/Login";
import GenericButton from "@/components/GenericButton";
import { setRefresh } from "@/state/common";
import loginInitialValues from "@/common/loginInitialValues";
import getPastEvents from "../api/getCreatedEvents";
import { T } from "@/theme";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSignup = () => {
    navigation.navigate("register");
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
      navigation.navigate("home");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AppGradient style={styles.root}>
      <Navbar />
      <Formik
        initialValues={loginInitialValues}
        onSubmit={handleLogin}
        validationSchema={LoginSchema}
      >
        {({ handleSubmit }) => (
          <AppScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.header}>
              <Text style={styles.eyebrow}>Welcome back</Text>
              <Text style={styles.title}>Sign In</Text>
              <View style={styles.accentLine} />
            </View>

            <View style={styles.form}>
              <TextField placeholder="Username" field="username" />
              <TextField
                placeholder="Password"
                field="password"
                secureTextEntry={true}
                onSubmitEditing={handleSubmit}
              />
            </View>

            <View style={styles.actions}>
              <GenericButton
                text="Sign In"
                onPress={() => handleSubmit()}
                buttonStyle={styles.primaryButton}
              />
              <Text style={styles.switchText} onPress={handleSignup}>
                No account yet?{" "}
                <Text style={styles.switchLink}>Create one</Text>
              </Text>
            </View>
          </AppScrollView>
        )}
      </Formik>
    </AppGradient>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  scrollView: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 32,
    marginBottom: 32,
  },
  eyebrow: {
    color: T.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: T.text,
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: -1,
    marginBottom: 12,
  },
  accentLine: {
    width: 40,
    height: 3,
    backgroundColor: T.accent,
    borderRadius: 2,
  },
  form: {
    width: "100%",
    marginBottom: 8,
  },
  actions: {
    width: "100%",
    alignItems: "center",
    gap: 16,
    marginTop: 8,
  },
  primaryButton: {
    width: "100%",
    paddingVertical: 16,
  },
  switchText: {
    color: T.textMuted,
    fontSize: 14,
  },
  switchLink: {
    color: T.accent,
    fontWeight: "600",
  },
});
