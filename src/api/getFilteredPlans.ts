import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";
import EventResponse from "@/interfaces/responses/Event";

export default async () => {
  const headers = await getHeaders();
  const { data } = await axios.get<EventResponse[]>(
    `${API_URL}/events/filter`,
    headers
  );
  return data;
};
