import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";

export default async (friendId: string) => {
  const headers = await getHeaders();
  const res = await axios.post(
    `${API_URL}/users/add-friend`,
    { friendId },
    headers
  );
  return res.data;
};
