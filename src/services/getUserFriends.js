import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserFriends = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const res = await axios.get(`${API_URL}/users/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};
