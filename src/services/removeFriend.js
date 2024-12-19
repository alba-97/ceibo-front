import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import axios from "axios";

export const removeFriend = async (userId, friendId) => {
  try {
    // const token = await AsyncStorage.getItem("token");
    const res = await axios.put(`${API_URL}/users/remove-friend/${friendId}`, {
      userId: userId,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
