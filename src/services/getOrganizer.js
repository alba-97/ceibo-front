import axios from "axios";
import { API_URL, PORT } from "@env";

export async function getOrganizer(id) {
  try {
    console.log(1, id);
    const res = await axios.get(
      `${API_URL}:${PORT}/api/events/${id}/organizer`
    );
    console.log(2);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
