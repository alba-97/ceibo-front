import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";

export default async (text: string, planId: string) => {
  const headers = await getHeaders();
  const { data } = await axios.post(
    `${API_URL}/comments/${planId}`,
    { text },
    headers
  );
  return data;
};
