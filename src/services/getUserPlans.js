import axios from "axios";
import { API_URL, PORT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUserPlans() {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(`${API_URL}:${PORT}/api/events/my-events`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return [];
  }
}
