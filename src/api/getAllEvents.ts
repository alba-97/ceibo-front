import axios from "axios";
import { API_URL } from "@env";
import EventResponse from "@/interfaces/responses/Event";
import Paginated from "@/interfaces/Paginated";

export default async () => {
  const { data } = await axios.get<Paginated<EventResponse>>(
    `${API_URL}/events`
  );
  return data;
};
