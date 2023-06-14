import axios from "axios";
import { API_URL, PORT } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function addComment(text, planId) {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.post(
      `${API_URL}:${PORT}/api/comments/${planId}`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(123, error);
  }
}
