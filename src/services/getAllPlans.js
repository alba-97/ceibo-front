import axios from "axios";
import { API_URL, PORT } from "@env";

export async function getAllPlans() {
  try {
    const allPlans = await axios.get(`${API_URL}:${PORT}/api/events`);
    return allPlans.data;
  } catch (error) {
    console.error(error);
  }
}
