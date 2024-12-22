import axios from "axios";
import { API_URL } from "@env";

export default async (id: string) => {
  const { data } = await axios.get(`${API_URL}/events/${id}/organizer`);
  return data;
};
