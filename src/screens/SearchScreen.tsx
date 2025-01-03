import { Text, ScrollView, View, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import GenericInput from "../components/GenericInput";
import { Navbar } from "../components/Navbar";
import { API_URL } from "@env";
import { styles } from "../appCss";
import axios from "axios";
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
import IOption from "@/interfaces/Option";
import handleError from "@/utils/handleError";

export default function SearchScreen() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  const options = [
    { label: "Texto", value: "text" },
    { label: "Categoría", value: "category" },
    { label: "Usuario", value: "user" },
  ];
  const [option, setOption] = useState<IOption>(options[0]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const { refetch } = refetchData();

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

  const handleQueryChange = (text: string) => {
    setQuery(text);
  };

  const handleSearch = () => {
    if (option.value == "text") {
      axios
        .get(`${API_URL}/events/search?query=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          Alert.alert("Error", "Evento no encontrado");
          console.log(error);
        });
    } else if (option.value == "category") {
      axios
        .get(`${API_URL}/events/search/category?query=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          Alert.alert("Error", "Evento no encontrado");
          console.log(error);
        });
    } else if (option.value == "user") {
      axios
        .get(`${API_URL}/events/search/user?query=${query}`)
        .then((response) => {
          setResults(response.data);
        })
        .catch((error) => {
          Alert.alert("Error", "Evento no encontrado");
          console.log(error);
        });
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/events`);
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
      <LinearGradient
        colors={["#000", "#7D0166"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}
      >
        <Navbar />
        <View style={styles.searchContainer}>
          <GenericInput
            value={query}
            onSubmitEditing={handleSearch}
            onChangeText={handleQueryChange}
            placeholder="Buscar plan"
          />
        </View>
        <RadioButton
          style={{ flexDirection: "row", marginVertical: 10 }}
          options={options}
          onSelect={setOption}
          defaultValue={option}
        />
        <View style={styles.content}>
          <ScrollView style={{ width: "100%" }}>
            {results ? (
              results.map((item, index) => (
                <SearchImg key={index} plan={item} onPress={handlePress} />
              ))
            ) : (
              <Text>Cargando datos...</Text>
            )}
          </ScrollView>
        </View>
      </LinearGradient>
    </View>
  );
}
