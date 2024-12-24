import { LinearGradient } from "expo-linear-gradient";
import {
  Text,
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
} from "react-native";
import { useState, useEffect } from "react";
import { styles } from "../styles/addPlanStyles";
import { Navbar } from "../components/Navbar";
import axios from "axios";
import { API_URL } from "@env";
import ChevronImg from "../assets/images/chevron.png";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import getCategories from "../api/getCategories";
import ModalSelector from "react-native-modal-selector";
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IOption from "@/interfaces/Option";
import fromCategoryResponsesToOptions from "@/utils/category/fromCategoryResponsesToOptions";
import handleError from "@/utils/handleError";
import createEvent from "@/api/createEvent";
import { Formik } from "formik";
import EventForm from "@/interfaces/forms/Event";

interface IAddPlanScreen2Props {
  route?: {
    params: {
      title: string;
      description: string;
      location: string;
      start_date: Date | null;
      end_date: Date | null;
      img: string;
    };
  };
}

export default function AddPlanScreen2({
  route = {
    params: {
      title: "",
      description: "",
      location: "",
      start_date: null,
      end_date: null,
      img: "",
    },
  },
}: IAddPlanScreen2Props) {
  const [category, setCategory] = useState<IOption>({
    value: "default",
    label: "Default",
  });
  const [categories, setCategories] = useState<IOption[]>([]);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
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
    min_age: null,
    max_age: null,
    min_to_pay: null,
    total_to_pay: null,
    category: "Default",
    link_to_pay: "",
    private: false,
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#000", "#7D0166"]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.container}
      >
        <Navbar />
        <TouchableOpacity
          style={{
            flexDirection: "row",
            left: "-20%",
            marginTop: "5%",
            marginBottom: "5%",
          }}
          onPress={handleBack}
        >
          <Feather
            name="arrow-left"
            size={30}
            color="white"
            style={{ marginLeft: "5%" }}
          />
        </TouchableOpacity>
        <ScrollView>
          <Formik
            initialValues={initialValues}
            onSubmit={async (values) => {
              try {
                let imageUrl;

                if (
                  ![
                    "https://cdn.discordapp.com/attachments/1105565124825186415/1113122954897801406/El_club_del_plan.png",
                    "",
                  ].includes(values.img)
                ) {
                  const response = await fetch(values.img);
                  const blob = await response.blob();
                  const formData = new FormData();
                  formData.append("image", blob, "image.jpg");
                  const res = await axios.post(`${API_URL}/upload`, formData);
                  imageUrl = res.data.imageUrl;
                }

                values.img = imageUrl;
                await createEvent(values);
                Alert.alert("Exito", "Evento agregado");
                navigation.navigate("HomeScreen");
              } catch (err) {
                handleError(err);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              setFieldValue,
            }) => (
              <View>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Minima Edad</Text>
                  <TextInput
                    onChangeText={handleChange("min_age")}
                    onBlur={handleBlur("min_age")}
                    value={`${values.min_age}`}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Máxima Edad</Text>
                  <TextInput
                    onChangeText={handleChange("max_age")}
                    onBlur={handleBlur("max_age")}
                    value={`${values.max_age}`}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Mínimo a pagar</Text>
                  <TextInput
                    onChangeText={handleChange("min_to_pay")}
                    onBlur={handleBlur("min_to_pay")}
                    value={`${values.min_to_pay}`}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Total a pagar</Text>
                  <TextInput
                    onChangeText={handleChange("total_to_pay")}
                    onBlur={handleBlur("total_to_pay")}
                    value={`${values.total_to_pay}`}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <ModalSelector
                    data={categories}
                    onChange={(option: IOption) => {
                      setFieldValue("category", option.value);
                      setCategory(option);
                    }}
                    overlayStyle={{ backgroundColor: "transparent" }}
                    optionContainerStyle={{
                      backgroundColor: "#691359",
                      borderWidth: 8,
                      borderRadius: 4,
                      borderColor: "#59104c",
                    }}
                    optionTextStyle={{
                      fontWeight: "bold",
                      color: "white",
                    }}
                    cancelStyle={{
                      backgroundColor: "#781365",
                    }}
                    cancelTextStyle={{
                      fontWeight: "bold",
                      color: "white",
                    }}
                    cancelText="Cancelar"
                  >
                    <Text style={styles.categoryContainer}>
                      {category.label}
                      <Image
                        source={ChevronImg}
                        resizeMode="contain"
                        style={{ width: 20, height: 20 }}
                      />
                    </Text>
                  </ModalSelector>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Link para pagar</Text>
                  <TextInput
                    onChangeText={handleChange("link_to_pay")}
                    onBlur={handleBlur("link_to_pay")}
                    value={values.link_to_pay}
                  />
                </View>

                <Button onPress={() => handleSubmit()} title="Submit" />
              </View>
            )}
          </Formik>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}
