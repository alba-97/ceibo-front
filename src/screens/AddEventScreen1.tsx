import { View, Text, StyleSheet } from "react-native";
import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import eventInitialValues from "@/common/eventInitialValues";
import TextField from "@/components/TextField";
import DateField from "@/components/DateField";
import ImageField from "@/components/ImageField";
import GenericButton from "@/components/GenericButton";
import EventForm from "@/interfaces/forms/Event";
import AddEventSchema1 from "@/utils/schema/AddEventSchema1";
import AppGradient from "@/components/AppGradient";
import AppScrollView from "@/components/AppScrollView";
import { T } from "@/theme";

export default function AddEventScreen1() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const goToNextStep = (values: EventForm) => {
    navigation.navigate("add-event-2", values);
  };

  return (
    <View style={styles.root}>
      <AppGradient style={styles.gradient}>
        <Navbar />
        <Formik
          initialValues={eventInitialValues}
          onSubmit={goToNextStep}
          validationSchema={AddEventSchema1}
        >
          {({ handleSubmit }) => (
            <AppScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.header}>
                <Text style={styles.step}>Step 1 of 2</Text>
                <Text style={styles.title}>Create Event</Text>
                <View style={styles.accentLine} />
              </View>

              <View style={styles.form}>
                <TextField placeholder="Title" field="title" />
                <TextField placeholder="Description" field="description" />
                <TextField placeholder="Location" field="location" />
                <DateField placeholder="Start Date" field="start_date" />
                <DateField placeholder="End Date" field="end_date" />
                <ImageField placeholder="Cover Image" field="img" />
              </View>

              <View style={styles.actions}>
                <GenericButton
                  onPress={handleSubmit}
                  text="Continue →"
                  buttonStyle={styles.primaryButton}
                />
              </View>
            </AppScrollView>
          )}
        </Formik>
      </AppGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
    width: "100%",
  },
  scrollView: {
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 24,
    marginBottom: 28,
  },
  step: {
    color: T.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: T.text,
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: -0.5,
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
  },
  actions: {
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  primaryButton: {
    width: "80%",
    paddingVertical: 16,
  },
});
