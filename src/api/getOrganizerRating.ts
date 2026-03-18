import axios from "axios";
import { API_URL } from "@env";

export default async (eventId: string) => {
  const { data } = await axios.get<{ rating: number }>(
    `${API_URL}/events/${eventId}/organizer-rating`
  );
  return data;
};
