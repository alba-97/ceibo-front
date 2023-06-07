import axios from "axios";
import { API_URL, PORT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUser() {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await axios.get(`${API_URL}:${PORT}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
