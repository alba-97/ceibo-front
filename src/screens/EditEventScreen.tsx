import { StyleSheet, Switch, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import getCategories from "../api/getCategories";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IOption from "@/interfaces/Option";
import fromResponsesToOptions from "@/utils/category/fromResponsesToOptions";
import handleError from "@/utils/handleError";
import editEvent from "@/api/editEvent";
import { Formik } from "formik";
import EventForm from "@/interfaces/forms/Event";
import uploadImage from "@/api/uploadImage";
import TextField from "@/components/TextField";
import SelectField from "@/components/SelectField";
import DateField from "@/components/DateField";
import ImageField from "@/components/ImageField";
import GenericButton from "@/components/GenericButton";
import AppGradient from "@/components/AppGradient";
import AppScrollView from "@/components/AppScrollView";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { setRefetch } from "@/state/common";
import fromResponseToForm from "@/utils/event/fromResponseToForm";
import { toast } from "react-toastify";
import LoginScreen from "./LoginScreen";

export default function EditEventScreen() {
  const event = useSelector((state: RootState) => state.selectedEvent);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<IOption[]>([]);

  const fetchCategories = async () => {
    try {
      const { data } = await getCategories();
      setCategories(fromResponsesToOptions(data));
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (values: EventForm) => {
    try {
      if (values.img && values.img !== event.img) {
        const url = await uploadImage(values.img);
        values.img = url;
      }
      await editEvent(event._id, values);
      toast.success("Evento actualizado");
      dispatch(setRefetch());
      navigation.navigate("home");
    } catch (err) {
      handleError(err);
    }
  };

  if (!event._id) return <LoginScreen />;

  return (
    <View style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar />
        <Formik
          initialValues={fromResponseToForm(event) as EventForm}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit: submit, values, setFieldValue }) => (
            <AppScrollView style={styles.scrollView}>
              <View style={styles.form}>
                <TextField placeholder="Title" field="title" />
                <TextField placeholder="Description" field="description" />
                <TextField placeholder="Location" field="location" />
                <DateField placeholder="Start Date" field="start_date" />
                <DateField placeholder="End Date" field="end_date" />
                <ImageField placeholder="Image" field="img" />
                <TextField placeholder="Minimum age" field="min_age" />
                <TextField placeholder="Maximum age" field="max_age" />
                <TextField placeholder="Minimum to pay" field="min_to_pay" />
                <TextField placeholder="Total to pay" field="total_to_pay" />
                <SelectField data={categories} field="category" />
                <TextField placeholder="Link to pay" field="link_to_pay" />
                <View style={styles.checkboxRow}>
                  <Switch
                    value={values.private}
                    onValueChange={(v) => { setFieldValue("private", v); }}
                    trackColor={{ false: "#3A3A3A", true: "#ffffff" }}
                    thumbColor={values.private ? "#121212" : "#f4f3f4"}
                  />
                  <Text style={styles.checkboxLabel}>Private event?</Text>
                </View>
                <GenericButton onPress={submit} text="Guardar cambios" />
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
    gap: 10,
  },
  checkboxLabel: {
    color: "white",
    fontSize: 16,
  },
});
