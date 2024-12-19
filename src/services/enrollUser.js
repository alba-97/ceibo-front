import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import axios from "axios";
import { addUserPlan } from "../state/user";
import { Alert } from "react-native";

export const enrollUser = async (id, dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const res = await axios.post(
        `${API_URL}/events/enroll`,
        { eventId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addUserPlan(res.data));
    }
  } catch (error) {
    Alert.alert("Error", error.response.data);
  }
};
