import { View, Text, StyleSheet } from "react-native";
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
import { T } from "@/theme";

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
      navigation.navigate("login");
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <AppGradient style={styles.root}>
      <Navbar />
      <Formik
        initialValues={registerInitialValues}
        onSubmit={handleSubmit}
        validationSchema={RegisterSchema}
      >
        {({ handleSubmit: submit }) => (
          <AppScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.header}>
              <Text style={styles.eyebrow}>Join the network</Text>
              <Text style={styles.title}>Create Account</Text>
              <View style={styles.accentLine} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Account</Text>
              <TextField field="username" placeholder="Username" />
              <TextField field="email" placeholder="Email" />
              <TextField
                field="password"
                placeholder="Password"
                secureTextEntry
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Personal Info</Text>
              <TextField field="first_name" placeholder="First name" />
              <TextField field="last_name" placeholder="Last name" />
              <DateField field="birthdate" placeholder="Birthdate" dateOnly />
              <TextField field="address" placeholder="Address" />
              <TextField field="phone" placeholder="Phone" />
            </View>

            <View style={styles.divider} />

            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Profile Photo</Text>
              <ImageField placeholder="Profile photo" field="profile_img" />
            </View>

            <View style={styles.actions}>
              <GenericButton
                text="Create Account"
                onPress={submit}
                buttonStyle={styles.primaryButton}
              />
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
  section: {
    width: "100%",
    marginBottom: 8,
  },
  sectionLabel: {
    color: T.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 16,
    marginLeft: "10%",
  },
  divider: {
    height: 1,
    backgroundColor: T.border,
    marginVertical: 20,
    marginHorizontal: "10%",
  },
  actions: {
    width: "100%",
    alignItems: "center",
    marginTop: 24,
  },
  primaryButton: {
    width: "80%",
    paddingVertical: 16,
  },
});
