import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";

export default async (rating: number, planId: string) => {
  const headers = await getHeaders();
  const res = await axios.post(
    `${API_URL}/events/${planId}/rate`,
    { rating },

    headers
  );
  return res.data;
};
