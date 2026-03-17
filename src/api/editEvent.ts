import axios from "axios";
import { API_URL } from "@env";
import EventForm from "@/interfaces/forms/Event";
import getHeaders from "@/utils/getHeaders";

export default async (id: string, data: Partial<EventForm>) => {
  const headers = await getHeaders();
  await axios.put(`${API_URL}/events/${id}`, data, headers);
};
