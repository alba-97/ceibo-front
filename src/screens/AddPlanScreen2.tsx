import { Alert } from "react-native";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import getCategories from "../api/getCategories";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IOption from "@/interfaces/Option";
import fromCategoryResponsesToOptions from "@/utils/category/fromCategoryResponsesToOptions";
import handleError from "@/utils/handleError";
import createEvent from "@/api/createEvent";
import { Formik } from "formik";
import EventForm from "@/interfaces/forms/Event";
import uploadImage from "@/api/uploadImage";
import AddEventSchema2 from "@/utils/schema/AddEventSchema2";
import BackArrow from "@/components/BackArrow";
import TextField from "@/components/TextField";
import SelectField from "@/components/SelectField";
import initialValues from "@/common/eventInitialValues";
import GenericButton from "@/components/GenericButton";
import AppView from "@/components/AppView";
import AppGradient from "@/components/AppGradient";
import AppScrollView from "@/components/AppScrollView";

interface IAddPlanScreen2Props {
  route?: {
    params: EventForm;
  };
}

export default function AddPlanScreen2({
  route = { params: initialValues },
}: IAddPlanScreen2Props) {
  const [categories, setCategories] = useState<IOption[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const submitEvent = async (values: EventForm) => {
    try {
      const url = await uploadImage(values.img);
      values.img = url;
      await createEvent(values);
      Alert.alert("Success", "Event added successfully");
      navigation.navigate("HomeScreen");
    } catch (err) {
      handleError(err);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      const categories = fromCategoryResponsesToOptions(data);
      setCategories(categories);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleBack = () => {
    navigation.navigate("AddPlanScreen1");
  };

  const initialValues: EventForm = {
    ...route.params,
  };

  return (
    <AppView className="flex w-full h-full align-center">
      <AppGradient className="flex w-full align-center">
        <Navbar />
        <Formik
          initialValues={initialValues}
          validationSchema={AddEventSchema2}
          onSubmit={submitEvent}
        >
          {({ handleSubmit }) => (
            <AppScrollView className="w-full">
              <BackArrow onPress={handleBack} />
              <AppView className="w-full mt-20 align-center">
                <TextField placeholder="Minimum age" field="min_age" />
                <TextField placeholder="Maximum age" field="max_age" />
                <TextField placeholder="Minimum to pay" field="min_to_pay" />
                <TextField placeholder="Total to pay" field="total_to_pay" />
                <SelectField data={categories} field="category" />
                <TextField placeholder="Link to pay" field="link_to_pay" />
                <GenericButton onPress={handleSubmit} text="Submit" />
              </AppView>
            </AppScrollView>
          )}
        </Formik>
      </AppGradient>
    </AppView>
  );
}
