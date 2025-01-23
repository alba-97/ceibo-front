import axios from "axios";
import { API_URL } from "@env";
import EventForm from "@/interfaces/forms/Event";

export default async (eventData: EventForm) => {
  const { data } = await axios.post(`${API_URL}/event`, eventData);
  return data;
};
