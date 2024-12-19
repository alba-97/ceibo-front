import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCanEdit = async (id) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const res = await axios.get(`${API_URL}/events/${id}/can-update`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
