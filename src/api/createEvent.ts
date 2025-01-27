import axios from "axios";
import { API_URL } from "@env";
import EventForm from "@/interfaces/forms/Event";
import getHeaders from "@/utils/getHeaders";

export default async (eventData: EventForm) => {
  const headers = await getHeaders();
  const { data } = await axios.post(`${API_URL}/events`, eventData, headers);
  return data;
};
