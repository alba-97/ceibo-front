import axios from "axios";
import { API_URL } from "@env";

interface RatingResponse {
  rating: number;
}

export default async (id: string) => {
  const { data } = await axios.get<RatingResponse>(
    `${API_URL}/events/${id}/rating`
  );
  return data;
};
