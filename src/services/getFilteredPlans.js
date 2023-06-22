import axios from "axios";
import { API_URL } from "./urls";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFilteredPlans() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const res = await axios.get(`${API_URL}/api/events/filter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    }
  } catch (error) {
    return [];
  }
}
