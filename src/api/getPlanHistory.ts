import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";
import EventResponse from "@/interfaces/responses/Event";
import Paginated from "@/interfaces/Paginated";

export default async () => {
  const headers = await getHeaders();
  const res = await axios.get<Paginated<EventResponse>>(
    `${API_URL}/events/history`,
    headers
  );
  return res.data;
};
