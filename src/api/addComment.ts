import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addComment = async (text: string, planId: string) => {
  try {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.post(
      `${API_URL}/comments/${planId}`,
      { text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
