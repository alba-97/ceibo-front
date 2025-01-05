import { Text, ScrollView, View, Alert, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import GenericInput from "../components/GenericInput";
import { Navbar } from "../components/Navbar";
import { ParamListBase, useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { setSelectedPlan, setOrganizer } from "../state/selectedPlan";
import getPlan from "../api/getPlan";
import { SearchImg } from "../components/searchImage";
import getOrganizer from "../api/getOrganizer";
import refetchData from "../utils/refetchData";
import RadioButton from "../components/RadioButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import EventResponse from "@/interfaces/responses/Event";
import handleError from "@/utils/handleError";
import getPlans from "@/api/getPlans";
import { Formik } from "formik";
import EventQuery, { EventQueryType } from "@/interfaces/queries/Event";

export default function SearchScreen() {
  const options = [
    { label: "Text", value: "text" },
    { label: "Category", value: "category" },
    { label: "User", value: "user" },
  ];

  const [results, setResults] = useState<EventResponse[]>([]);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const { refetch } = refetchData();
  const inputRef = useRef<TextInput>(null);

  const handlePress = async (plan: EventResponse) => {
    try {
      const updatedPlan = await getPlan(plan._id);
      dispatch(setSelectedPlan(updatedPlan));
      const organizer = await getOrganizer(plan._id);
      dispatch(setOrganizer(organizer));
      navigation.navigate("PlanDetail");
    } catch (err) {
      handleError(err);
    }
  };

  const handleSearch = async (values: EventQuery) => {
    try {
      const events = await getPlans(values);
      setResults(events);
      inputRef.current?.focus();
    } catch (err) {
      Alert.alert("Error", "Event not found");
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const events = await getPlans();
      setResults(events);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]);

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
      }}
    >
      <LinearGradient
        colors={["#000", "#7D0166"]}
        start={[0, 0]}
        end={[1, 1]}
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
        }}
      >
        <Navbar />
        <Formik
          initialValues={{
            searchTerm: "",
            search: options[0].value as EventQueryType,
          }}
          onSubmit={handleSearch}
        >
          {({ handleSubmit, setFieldValue, values }) => (
            <View
              style={{
                width: "100%",
                paddingTop: "5%",
                alignItems: "center",
              }}
            >
              <GenericInput
                ref={inputRef}
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingHorizontal: 20,
            marginLeft: 30,
          }}
        >
          <ScrollView
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
          >
            {results?.map((item, index) => (
              <SearchImg key={index} plan={item} onPress={handlePress} />
            )) ?? <Text>Loading data...</Text>}
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
}
