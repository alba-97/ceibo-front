import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";

interface RatingResponse {
  rating: number;
}

export default async (id: string) => {
  const headers = await getHeaders();
  const { data } = await axios.get<RatingResponse>(
    `${API_URL}/events/${id}/rating`,
    headers
  );
  return data;
};
