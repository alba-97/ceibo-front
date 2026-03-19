import { StyleSheet, View, Text } from "react-native";
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
import { T } from "@/theme";

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
      navigation.navigate("home");
    } catch (err) {
      handleError(err);
    }
  };

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

  const handleBack = () => {
    navigation.navigate("add-event");
  };

  return (
    <View style={styles.root}>
      <AppGradient style={styles.gradient}>
        <Navbar />
        <Formik
          initialValues={route.params}
          validationSchema={AddEventSchema2}
          onSubmit={submitEvent}
        >
          {({ handleSubmit }) => (
            <AppScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.header}>
                <BackArrow onPress={handleBack} />
                <Text style={styles.step}>Step 2 of 2</Text>
                <Text style={styles.title}>Event Details</Text>
                <View style={styles.accentLine} />
              </View>

              <View style={styles.form}>
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
              </View>

              <View style={styles.actions}>
                <GenericButton
                  onPress={handleSubmit}
                  text="Publish Event"
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
    marginTop: 16,
    marginBottom: 28,
  },
  step: {
    color: T.accent,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginTop: 12,
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
    gap: 0,
  },
  halfField: {
    flex: 1,
  },
  actions: {
    width: "100%",
    alignItems: "center",
    marginTop: 16,
  },
  primaryButton: {
    width: "80%",
    paddingVertical: 16,
  },
});
