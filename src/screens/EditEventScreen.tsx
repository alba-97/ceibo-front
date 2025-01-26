import { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import LoginScreen from "./LoginScreen";
import ChevronImg from "../assets/images/chevron.png";
import ProfilePicture from "../components/ProfilePicture";
import GenericButton from "../components/GenericButton";
import { ChangeData } from "../components/ChangeData";
import { Navbar } from "../components/Navbar";
import * as ImagePicker from "expo-image-picker";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import getCategories from "../api/getCategories";
import ModalSelector from "react-native-modal-selector";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckBox } from "react-native-elements";
import axios from "axios";
import { API_URL } from "@env";
import { removeEvent } from "../state/events";
import { RootState } from "@/state/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import IOption from "@/interfaces/Option";
import fromResponsesToOptions from "@/utils/category/fromResponsesToOptions";
import handleError from "@/utils/handleError";
import { setRefetch } from "@/state/common";

export default function EditEventScreen() {
  const event = useSelector((state: RootState) => state.selectedEvent);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const [category, setCategory] = useState(event?.category?.name);
  const [imageUrl, setImageUrl] = useState(event?.img);
  const [categories, setCategories] = useState<IOption[]>([]);
  const [checked, setChecked] = useState(event?.private);

  const handleCheckBoxToggle = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await axios.put(
          `${API_URL}/events/${event._id}`,
          {
            private: !checked,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChecked(!checked);
        removeEvent(event._id);
      }
    } catch (err) {
      handleError(err);
    }
  };
  const fetchCategories = async () => {
    const { data } = await getCategories();
    const categories = fromResponsesToOptions(data);
    setCategories(categories);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      const token = await AsyncStorage.getItem("token");
      const path = result.assets?.[0].uri;
      if (token && path) {
        if (path !== "") {
          const formData = new FormData();
          const file = {
            uri: path,
            type: "image/jpeg",
            name: "image.jpg",
          };
          const blob = await fetch(file.uri).then((response) =>
            response.blob()
          );
          formData.append("image", blob, file.name);
          const res = await axios.post(`${API_URL}/upload`, formData);
          await axios.put(
            `${API_URL}/events/${event._id}`,
            {
              img: res.data.imageUrl,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setImageUrl(res.data.imageUrl);
        }
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleRedirect = () => {
    dispatch(setRefetch());
    navigation.navigate("Home");
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      {event._id ? (
        <ScrollView>
          <View style={styles.container}>
            <ProfilePicture imageSource={"profile_img"} />
            <ChangeData field="title" placeholder="Title" />
            <ChangeData field="description" placeholder="Description" />
            <ChangeData field="location" placeholder="Location" />
            <ChangeData field="start_date" placeholder="Start date and time" />
            <ChangeData field="start_date" placeholder="End date and time" />
            <ChangeData field="min_age" placeholder="Min. age" />
            <ChangeData field="max_age" placeholder="Max. age" />
            <ChangeData field="min_to_pay" placeholder="Min. to pay" />
            <ChangeData field="total_to_pay" placeholder="Total to pay" />

            <ModalSelector
              data={categories}
              onChange={async (option: IOption) => {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                  await axios.put(
                    `${API_URL}/events/${event._id}`,
                    {
                      category: option.label,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  setCategory(option.label);
                }
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
                {category}{" "}
                <Image
                  source={ChevronImg}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
              </Text>
            </ModalSelector>

            <View>
              <CheckBox
                title="¿Evento privado?"
                checked={checked}
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                }}
                textStyle={{ color: "white" }}
                checkedColor="white"
                onPress={handleCheckBoxToggle}
              />
            </View>

            <ChangeData field="link_to_pay" placeholder="Link to pay" />

            <TouchableOpacity style={styles.container} onPress={selectImage}>
              {imageUrl && (
                <Image
                  source={{
                    uri: imageUrl,
                  }}
                  style={styles.image}
                />
              )}
            </TouchableOpacity>

            <View style={{ marginBottom: "5%" }} />
            <GenericButton onPress={handleRedirect} text="Volver" />
          </View>
        </ScrollView>
      ) : (
        <LoginScreen />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 110,
  },
  categoryContainer: {
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(225, 200, 200, 0.3)",
    borderColor: "rgba(10, 7, 7, 0.2)",
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
});
