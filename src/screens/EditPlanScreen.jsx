import React from "react";
import axios from "axios";
import { API_URL, PORT } from "@env";
import { ScrollView, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import LoginScreen from "./LoginScreen";
// Components
import { ProfilePicture } from "../components/ProfilePicture";
import { GenericButton } from "../components/GenericButton";
import { styles } from "../styles/profileScreenStyles";
//import { clearUser } from "../state/selectedPlan";
import { ChangeData } from "../components/ChangeData";
import { Navbar } from "../components/Navbar";
//import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const plan = useSelector((state) => state.selectedPlan);

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      setPath(result.assets[0].uri);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LinearGradient
      colors={["#000", "#7D0166"]}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <Navbar />
      {user._id ? (
        <ScrollView>
          <View style={styles.container}>
            <ProfilePicture imageSource={"profile_img"} />
            <ChangeData
              keyboardType="default"
              baseData={plan?.title}
              propName={"title"}
            />
            <ChangeData
              keyboardType="default"
              baseData={plan?.description}
              propName={"description"}
            />
            <ChangeData
              keyboardType="default"
              baseData={plan?.location}
              propName={"location"}
            />
            <ChangeData
              keyboardType="default"
              baseData={plan?.event_date}
              propName={"event_date"}
            />
            <ChangeData
              keyboardType="email-address"
              baseData={plan?.start_time}
              propName={"start_time"}
            />
            <ChangeData
              keyboardType="numeric"
              baseData={plan?.end_time}
              propName={"end_time"}
            />
            <ChangeData
              keyboardType="date"
              baseData={plan?.min_age}
              propName={"min_age"}
            />
            <ChangeData
              keyboardType="date"
              baseData={plan?.max_age}
              propName={"max_age"}
            />
            <ChangeData
              keyboardType="date"
              baseData={plan?.min_to_pay}
              propName={"min_to_pay"}
            />
            <ChangeData
              keyboardType="date"
              baseData={plan?.total_to_pay}
              propName={"total_to_pay"}
            />
            <ChangeData
              keyboardType="date"
              baseData={plan?.category}
              propName={"category"}
            />
            <ChangeData
              keyboardType="date"
              baseData={plan?.link_to_pay}
              propName={"link_to_pay"}
            />

            <TouchableOpacity style={styles.container} onPress={selectImage}>
              <Image
                source={{
                  uri: plan?.img,
                }}
                style={styles.image}
              />
            </TouchableOpacity>

            <View style={{ marginBottom: "2%" }} />
            <GenericButton onPress={handleUpdate} text="Actualizar evento" />
          </View>
        </ScrollView>
      ) : (
        <LoginScreen />
      )}
    </LinearGradient>
  );
}
