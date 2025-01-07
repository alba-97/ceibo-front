import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { ProfileText } from "../components/ProfileText";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Formik } from "formik";
import initialValues from "@/common/eventInitialValues";
import TextField from "@/components/TextField";
import DateField from "@/components/DateField";
import ImageField from "@/components/ImageField";
import GenericButton from "@/components/GenericButton";
import EventForm from "@/interfaces/forms/Event";
import AddEventSchema1 from "@/utils/schema/AddEventSchema1";
import AppView from "@/components/AppView";
import AppGradient from "@/components/AppGradient";
import AppScrollView from "@/components/AppScrollView";

export default function AddPlanScreen1() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const goToNextStep = (values: EventForm) => {
    navigation.navigate("AddPlanScreen2", values);
  };

  return (
    <AppView className="flex w-full h-full align-center">
      <AppGradient className="flex w-full align-center">
        <Navbar />
        <Formik
          initialValues={initialValues}
          onSubmit={goToNextStep}
          validationSchema={AddEventSchema1}
        >
          {({ handleSubmit }) => (
            <AppScrollView
              className="w-full"
              contentContainerStyle={{ alignItems: "center" }}
            >
              <ProfileText text="Create Event" />
              <AppView className="my-20 w-full align-center justify-center">
                <TextField placeholder="Title" field="title" />
                <TextField placeholder="Description" field="description" />
                <TextField placeholder="Location" field="location" />

                <DateField placeholder="Start Date" field="start_date" />
                <DateField placeholder="End Date" field="end_date" />

                <ImageField placeholder="Image" field="img" />

                <GenericButton onPress={handleSubmit} text="Next" />
              </AppView>
            </AppScrollView>
          )}
        </Formik>
      </AppGradient>
    </AppView>
  );
}
