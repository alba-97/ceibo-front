import { LinearGradient } from "expo-linear-gradient";
import { View, ScrollView } from "react-native";
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

export default function AddPlanScreen1() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const goToNextStep = (values: EventForm) => {
    navigation.navigate("AddPlanScreen2", values);
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <LinearGradient
        colors={["#000", "#7D0166"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Navbar />
        <Formik
          initialValues={initialValues}
          onSubmit={goToNextStep}
          validationSchema={AddEventSchema1}
        >
          {({ handleSubmit }) => (
            <ScrollView
              style={{ width: "100%" }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ alignItems: "center" }}
            >
              <ProfileText text="Create Event" />
              <View
                style={{
                  marginVertical: 20,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TextField placeholder="Title" field="title" />
                <TextField placeholder="Description" field="description" />
                <TextField placeholder="Location" field="location" />

                <DateField placeholder="Start Date" field="start_date" />
                <DateField placeholder="End Date" field="end_date" />

                <ImageField placeholder="Image" field="img" />

                <GenericButton onPress={handleSubmit} text="Next" />
              </View>
            </ScrollView>
          )}
        </Formik>
      </LinearGradient>
    </View>
  );
}
