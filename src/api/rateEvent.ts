import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";

export default async (rating: number, eventId: string) => {
  const headers = await getHeaders();
  const { data } = await axios.post(
    `${API_URL}/events/${eventId}/rate`,
    { rating },

    headers
  );
  return data;
};
