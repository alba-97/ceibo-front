import axios from "axios";
import { API_URL } from "@env";
import EventResponse from "@/interfaces/responses/Event";

export default async () => {
  const { data } = await axios.get<EventResponse[]>(`${API_URL}/events`);
  return data;
};
