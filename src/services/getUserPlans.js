import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUserPlans() {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(`${API_URL}/events/my-events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
