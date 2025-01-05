import axios from "axios";
import { API_URL } from "@env";
import EventResponse from "@/interfaces/responses/Event";
import EventQuery from "@/interfaces/queries/Event";

export default async (query: EventQuery = {}) => {
  const params = new URLSearchParams({ ...query });
  const queryString = params.toString();
  const { data } = await axios.get<EventResponse[]>(
    `${API_URL}/events?${queryString}`
  );
  return data;
};
