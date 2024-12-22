import axios from "axios";
import { API_URL } from "@env";
import EventForm from "@/interfaces/forms/Event";
import getHeaders from "@/utils/getHeaders";

export default async (data: Partial<EventForm>) => {
  const headers = await getHeaders();
  await axios.put(`${API_URL}/events/`, data, headers);
};
