import { Text, View, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import GenericInput from "../components/GenericInput";
import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEvent, setAuthor } from "../state/selectedEvent";
import getEvent from "../api/getEvent";
import RadioButton from "../components/RadioButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import EventResponse from "@/interfaces/responses/Event";
import handleError from "@/utils/handleError";
import getEvents from "@/api/getEvents";
import { Formik } from "formik";
import EventQuery, { EventQueryType } from "@/interfaces/queries/Event";
import AppGradient from "@/components/AppGradient";
import AppScrollView from "@/components/AppScrollView";
import { StyleSheet } from "react-native";
import { RootState } from "@/state/store";
import SearchImage from "@/components/SearchImage";

export default function SearchScreen() {
  const options = [
    { label: "Text", value: "text" },
    { label: "Category", value: "category" },
    { label: "User", value: "user" },
  ];

  const [results, setResults] = useState<EventResponse[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const { refetch } = useSelector((state: RootState) => state.common);
  const inputRef = useRef<TextInput>(null);

  const handlePress = async (event: EventResponse) => {
    try {
      const updatedEvent = await getEvent(event._id);
      dispatch(setSelectedEvent(updatedEvent));
      dispatch(setAuthor(updatedEvent.createdBy));
      navigation.navigate("event-detail");
    } catch (err) {
      handleError(err);
    }
  };

  const handleSearch = async (values: EventQuery) => {
    try {
      const { data } = await getEvents(values);
      setResults(data);
      inputRef.current?.focus();
    } catch (err) {
      handleError(err);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await getEvents();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]);

  return (
    <View style={styles.container}>
      <AppGradient style={styles.gradient}>
        <Navbar />
        <Formik
          initialValues={{
            searchTerm: "",
            search: options[0].value as EventQueryType,
          }}
          onSubmit={handleSearch}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <View style={styles.form}>
              <GenericInput
                value={values.searchTerm}
                onSubmitEditing={handleSubmit}
                onChangeText={(searchTerm: string) =>
                  setFieldValue("searchTerm", searchTerm)
                }
                placeholder="Search event"
              />

              <RadioButton
                options={options}
                onSelect={(option) => setFieldValue("search", option.value)}
              />
            </View>
          )}
        </Formik>
        <View style={styles.eventContainer}>
          <AppScrollView style={styles.scrollView}>
            {results.map((item, index) => (
              <SearchImage key={index} event={item} onPress={handlePress} />
            )) ?? <Text>Loading data...</Text>}
          </AppScrollView>
        </View>
      </AppGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  gradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  form: {
    width: "100%",
    paddingTop: "5%",
    alignItems: "center",
  },
  eventContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    marginLeft: 30,
    width: "100%",
  },
  scrollView: {
    width: "100%",
  },
});
