import axios from "axios";
import { API_URL } from "./urls";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { removePlanFromUser } from "../state/user";
import { removePlan } from "../state/plans";

export const deleteEvent = async (id, dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      await axios.delete(`${API_URL}/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removePlanFromUser(id));
      dispatch(removePlan(id));
    }
  } catch (error) {
    Alert.alert("Error", error.response.data);
  }
};
