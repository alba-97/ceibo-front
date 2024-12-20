import axios from "axios";
import { API_URL } from "@env";

export async function getOrganizer(id: string) {
  try {
    const res = await axios.get(`${API_URL}/events/${id}/organizer`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
