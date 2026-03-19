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
import { T } from "@/theme";

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
    <View style={styles.root}>
      <AppGradient style={styles.gradient}>
        <Navbar />
        <Formik
          initialValues={fromResponseToForm(event) as EventForm}
          onSubmit={handleSubmit}
        >
          {({ handleSubmit: submit, values, setFieldValue }) => (
            <AppScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.header}>
                <Text style={styles.eyebrow}>Edit event</Text>
                <Text style={styles.title}>Save Changes</Text>
                <View style={styles.accentLine} />
              </View>

              <View style={styles.form}>
                <TextField placeholder="Title" field="title" />
                <TextField placeholder="Description" field="description" />
                <TextField placeholder="Location" field="location" />
                <DateField placeholder="Start Date" field="start_date" />
                <DateField placeholder="End Date" field="end_date" />
                <ImageField placeholder="Cover Image" field="img" />
                <View style={styles.row}>
                  <View style={styles.halfField}>
                    <TextField placeholder="Min Age" field="min_age" />
                  </View>
                  <View style={styles.halfField}>
                    <TextField placeholder="Max Age" field="max_age" />
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.halfField}>
                    <TextField placeholder="Min to Pay" field="min_to_pay" />
                  </View>
                  <View style={styles.halfField}>
                    <TextField
                      placeholder="Total to Pay"
                      field="total_to_pay"
                    />
                  </View>
                </View>
                <SelectField data={categories} field="category" />
                <TextField placeholder="Link to Pay" field="link_to_pay" />

                <View style={styles.toggleRow}>
                  <Text style={styles.toggleLabel}>Private event</Text>
                  <Switch
                    value={values.private}
                    onValueChange={(v) => setFieldValue("private", v)}
                    trackColor={{ false: T.border, true: T.accentDim }}
                    thumbColor={values.private ? T.accent : T.textMuted}
                  />
                </View>
              </View>

              <View style={styles.actions}>
                <GenericButton
                  onPress={submit}
                  text="Save Changes"
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
  row: {
    flexDirection: "row",
    width: "100%",
  },
  halfField: {
    flex: 1,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: T.bgCard,
    borderRadius: T.radius.md,
    borderWidth: 1,
    borderColor: T.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    width: "100%",
  },
  toggleLabel: {
    color: T.text,
    fontSize: 14,
    fontWeight: "600",
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
