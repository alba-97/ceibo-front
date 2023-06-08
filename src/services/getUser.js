import axios from "axios";
import { API_URL, PORT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUser() {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const res = await axios.get(`${API_URL}:${PORT}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } else {
      return { _id: null };
    }
  } catch (error) {
    console.log(error);
    return { _id: null };
  }
}
