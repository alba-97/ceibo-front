import axios from "axios";
import { API_URL, PORT } from "@env";

export async function getOrganizer(id) {
  try {
    const res = await axios.get(
      `${API_URL}:${PORT}/api/events/${id}/organizer`
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
