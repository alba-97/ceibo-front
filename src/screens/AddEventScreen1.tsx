import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { ProfileText } from "../components/ProfileText";
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
import { StyleSheet, View } from "react-native";

export default function AddEventScreen1() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const goToNextStep = (values: EventForm) => {
    navigation.navigate("add-event-2", values);
  };

  return (
    <View style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar />
        <Formik
          initialValues={eventInitialValues}
          onSubmit={goToNextStep}
          validationSchema={AddEventSchema1}
        >
          {({ handleSubmit }) => (
            <AppScrollView style={styles.scrollView}>
              <ProfileText text="Create Event" />
              <View style={styles.form}>
                <TextField placeholder="Title" field="title" />
                <TextField placeholder="Description" field="description" />
                <TextField placeholder="Location" field="location" />

                <DateField placeholder="Start Date" field="start_date" />
                <DateField placeholder="End Date" field="end_date" />

                <ImageField placeholder="Image" field="img" />

                <GenericButton onPress={handleSubmit} text="Next" />
              </View>
            </AppScrollView>
          )}
        </Formik>
      </AppGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
    width: "100%",
  },
});
