import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserForm from "@/interfaces/forms/User";

export async function updateUser(data: UserForm) {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.put(`${API_URL}/users/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
}
