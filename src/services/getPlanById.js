import axios from "axios";
import { API_URL, PORT } from "@env";

export async function getPlanById(id) {
  try {
    const plan = await axios.get(`${API_URL}:${PORT}/api/events/${id}`);
    return plan.data;
  } catch (error) {
    throw Error(error);
  }
}
