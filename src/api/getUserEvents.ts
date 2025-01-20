import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";
import Paginated from "@/interfaces/Paginated";
import EventResponse from "@/interfaces/responses/Event";

export default async () => {
  const headers = await getHeaders();
  const { data } = await axios.get<Paginated<EventResponse>>(
    `${API_URL}/events/my-events`,
    headers
  );
  return data;
};
