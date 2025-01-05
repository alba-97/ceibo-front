import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";
import EventResponse from "@/interfaces/responses/Event";

export default async (query: string) => {
  const headers = await getHeaders();
  const { data } = await axios.get<EventResponse[]>(
    `${API_URL}/events/search/category?query=${query}`,
    headers
  );
  return data;
};
