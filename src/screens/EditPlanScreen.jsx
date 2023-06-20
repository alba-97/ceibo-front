import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import LoginScreen from "./LoginScreen";
import ChevronImg from "../assets/images/chevron.png";
// Components
import { ProfilePicture } from "../components/ProfilePicture";
import { GenericButton } from "../components/GenericButton";
import { styles } from "../styles/editPlanStyles";
import { ChangeEventData } from "../components/ChangeEventData";
import { Navbar } from "../components/Navbar";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { getCategories } from "../services/getCategories";
import ModalSelector from "react-native-modal-selector";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { API_URL } from "@env";
import refetchData from "../services/refetchData";

export default function ProfileScreen() {
  const plan = useSelector((state) => state.selectedPlan);
  const navigation = useNavigation();

  const [category, setCategory] = useState(plan?.category?.name);
  const [imageUrl, setImageUrl] = useState(plan?.img);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(
        data.map((item, index) => ({ key: index, label: item.name }))
      );
    });
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
      const path = result?.assets[0]?.uri;
      if (token && path) {
        if (path !== "") {
          const formData = new FormData();
          formData.append("image", {
            uri: path,
            type: "image/jpeg",
            name: "image.jpg",
          });
          const res = await axios.post(`${API_URL}/api/upload`, formData);
          await axios.put(
            `${API_URL}/api/events/${plan._id}`,
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
    } catch (error) {
      Alert.alert("Error", error.response.data);
      console.log(error);
    }
  };

  const { triggerRefetch } = refetchData();

  const handleRedirect = () => {
    triggerRefetch();
    navigation.navigate("HomeScreen");
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      {plan._id ? (
        <ScrollView>
          <View style={styles.container}>
            <ProfilePicture imageSource={"profile_img"} />
            <ChangeEventData
              keyboardType="default"
              baseData={plan?.title}
              propName={"title"}
            />
            <ChangeEventData
              keyboardType="default"
              baseData={plan?.description}
              propName={"description"}
            />
            <ChangeEventData
              keyboardType="default"
              baseData={plan?.location}
              propName={"location"}
            />
            <ChangeEventData
              keyboardType="date"
              baseData={plan?.event_date}
              propName={"event_date"}
            />
            <ChangeEventData
              keyboardType="numeric"
              baseData={plan?.start_time}
              propName={"start_time"}
            />
            <ChangeEventData
              keyboardType="numeric"
              baseData={plan?.end_time}
              propName={"end_time"}
            />
            <ChangeEventData
              keyboardType="numeric"
              baseData={plan?.min_age}
              propName={"min_age"}
            />
            <ChangeEventData
              keyboardType="numeric"
              baseData={plan?.max_age}
              propName={"max_age"}
            />
            <ChangeEventData
              keyboardType="numeric"
              baseData={plan?.min_to_pay}
              propName={"min_to_pay"}
            />
            <ChangeEventData
              keyboardType="numeric"
              baseData={plan?.total_to_pay}
              propName={"total_to_pay"}
            />

            <ModalSelector
              data={categories}
              onChange={async (option) => {
                const token = await AsyncStorage.getItem("token");
                if (token) {
                  await axios.put(
                    `${API_URL}/api/events/${plan._id}`,
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
              <Text style={styles.categoryContainer} value={category}>
                {category}{" "}
                <Image
                  source={ChevronImg}
                  resizeMode="contain"
                  style={{ width: 20, height: 20 }}
                />
              </Text>
            </ModalSelector>

            <ChangeEventData
              keyboardType="default"
              baseData={plan?.link_to_pay}
              propName={"link_to_pay"}
            />

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
