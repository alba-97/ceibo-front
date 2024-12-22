import axios, { AxiosError } from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { removePlanFromUser } from "../state/user";
import { removePlan } from "../state/plans";
import { Dispatch } from "redux";

export const deleteEvent = async (id: string, dispatch: Dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      await axios.delete(`${API_URL}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removePlanFromUser(id));
      dispatch(removePlan(id));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      Alert.alert("Error", error.response?.data);
    }
  }
};
