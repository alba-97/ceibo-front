import axios from "axios";
import { API_URL, PORT } from "@env";

export async function getPlan(id) {
  try {
    const res = await axios.get(`${API_URL}:${PORT}/api/events/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
