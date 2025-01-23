import { StyleSheet, View } from "react-native";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import getCategories from "../api/getCategories";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IOption from "@/interfaces/Option";
import fromResponsesToOptions from "@/utils/category/fromResponsesToOptions";
import handleError from "@/utils/handleError";
import createEvent from "@/api/createEvent";
import { Formik } from "formik";
import EventForm from "@/interfaces/forms/Event";
import uploadImage from "@/api/uploadImage";
import AddEventSchema2 from "@/utils/schema/AddEventSchema2";
import BackArrow from "@/components/BackArrow";
import TextField from "@/components/TextField";
import SelectField from "@/components/SelectField";
import eventInitialValues from "@/common/eventInitialValues";
import GenericButton from "@/components/GenericButton";
import AppGradient from "@/components/AppGradient";
import AppScrollView from "@/components/AppScrollView";
import { toast } from "react-toastify";

interface IAddEventScreen2Props {
  route?: {
    params: EventForm;
  };
}

export default function AddEventScreen2({
  route = { params: eventInitialValues },
}: IAddEventScreen2Props) {
  const [categories, setCategories] = useState<IOption[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const submitEvent = async (values: EventForm) => {
    try {
      if (values.img) {
        const url = await uploadImage(values.img);
        values.img = url;
      }
      await createEvent(values);
      toast.success("Event added successfully");
      navigation.navigate("HomeScreen");
    } catch (err) {
      handleError(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      const categories = fromResponsesToOptions(data);
      setCategories(categories);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleBack = () => {
    navigation.navigate("AddEventScreen1");
  };

  return (
    <View style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar />
        <Formik
          initialValues={route.params}
          validationSchema={AddEventSchema2}
          onSubmit={submitEvent}
        >
          {({ handleSubmit }) => (
            <AppScrollView style={styles.scrollView}>
              <BackArrow onPress={handleBack} />
              <View style={styles.form}>
                <TextField placeholder="Minimum age" field="min_age" />
                <TextField placeholder="Maximum age" field="max_age" />
                <TextField placeholder="Minimum to pay" field="min_to_pay" />
                <TextField placeholder="Total to pay" field="total_to_pay" />
                <SelectField data={categories} field="category" />
                <TextField placeholder="Link to pay" field="link_to_pay" />
                <GenericButton onPress={handleSubmit} text="Submit" />
              </View>
            </AppScrollView>
          )}
        </Formik>
      </AppGradient>
    </View>
  );
}

const styles = StyleSheet.create({
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
  scrollView: {
    width: "100%",
  },
  form: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
});
