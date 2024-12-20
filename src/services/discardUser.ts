import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import axios, { AxiosError } from "axios";
import { removeUserPlan } from "../state/user";
import { Alert } from "react-native";
import { Dispatch } from "redux";

export const discardUser = async (id: string, dispatch: Dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.delete(`${API_URL}/events/stop-participating/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(removeUserPlan(id));
  } catch (error) {
    if (error instanceof AxiosError) {
      Alert.alert("Error", error.response?.data);
    }
  }
};
