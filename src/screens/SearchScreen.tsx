import { Text, View, TextInput, StyleSheet } from "react-native";
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
import { RootState } from "@/state/store";
import SearchImage from "@/components/SearchImage";
import { T } from "@/theme";

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
    <View style={styles.root}>
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
            <View style={styles.searchSection}>
              <Text style={styles.heading}>Discover</Text>
              <GenericInput
                value={values.searchTerm}
                onSubmitEditing={handleSubmit}
                onChangeText={(searchTerm: string) =>
                  setFieldValue("searchTerm", searchTerm)
                }
                placeholder="Search events..."
                customStyle={styles.searchInput}
              />
              <RadioButton
                options={options}
                onSelect={(option) => setFieldValue("search", option.value)}
              />
            </View>
          )}
        </Formik>

        <View style={styles.resultsSection}>
          <Text style={styles.resultsLabel}>
            {results.length > 0 ? `${results.length} results` : "No results"}
          </Text>
          <AppScrollView
            style={styles.scrollView}
            contentContainerStyle={{ alignItems: "flex-start" }}
          >
            {results.map((item, index) => (
              <SearchImage key={index} event={item} onPress={handlePress} />
            ))}
          </AppScrollView>
        </View>
      </AppGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  gradient: {
    flex: 1,
    width: "100%",
  },
  searchSection: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  heading: {
    color: T.text,
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  searchInput: {
    width: "100%",
    backgroundColor: T.bgCard,
    borderColor: T.border,
    marginBottom: 12,
  },
  resultsSection: {
    flex: 1,
    paddingHorizontal: 20,
    width: "100%",
  },
  resultsLabel: {
    color: T.textMuted,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  scrollView: {
    width: "100%",
  },
});
