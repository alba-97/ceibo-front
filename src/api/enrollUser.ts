import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import axios, { AxiosError } from "axios";
import { addUserPlan } from "../state/user";
import { Alert } from "react-native";
import { Dispatch } from "redux";

export const enrollUser = async (id: string, dispatch: Dispatch) => {
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
    if (error instanceof AxiosError) {
      Alert.alert("Error", error.response?.data);
    }
  }
};
