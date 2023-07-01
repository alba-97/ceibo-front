import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./urls";
import axios from "axios";
import { removeUserPlan } from "../state/user";
import { Alert } from "react-native";

export const discardUser = async (id, dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`${API_URL}/api/events/stop-participating/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(removeUserPlan(id));
  } catch (error) {
    Alert.alert("Error", error.response.data);
  }
};
