import { API_URL } from "@env";
import axios from "axios";

export default async (userId: string, friendId: string) => {
  const { data } = await axios.put(
    `${API_URL}/users/remove-friend/${friendId}`,
    {
      userId: userId,
    }
  );
  return data;
};
