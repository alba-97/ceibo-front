import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UserResponse from "@/interfaces/responses/User";

export const getUserFriends = async () => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    const res = await axios.get<UserResponse[]>(`${API_URL}/users/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } else {
    return [];
  }
};
