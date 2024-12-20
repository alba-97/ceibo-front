import { API_URL } from "@env";
import axios from "axios";

export const removeFriend = async (userId: string, friendId: string) => {
  try {
    const res = await axios.put(`${API_URL}/users/remove-friend/${friendId}`, {
      userId: userId,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
