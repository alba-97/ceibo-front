import axios from "axios";
import { API_URL, PORT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFilteredPlans() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const res = await axios.get(`${API_URL}:${PORT}/api/events/filter`, {
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