import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CategoryForm from "@/interfaces/forms/Category";

export async function addPreferences(preferences: CategoryForm[]) {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const res = await axios.post(
        `${API_URL}/users/preferences/`,
        preferences,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.status;
    }
  } catch (error) {
    console.error(error);
  }
}
