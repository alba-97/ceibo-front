import axios from "axios";
import { API_URL, PORT } from "@env";

export async function getAllPlans() {
  try {
    const res = await axios.get(`${API_URL}:${PORT}/api/events`);
    return res.data;
  } catch (error) {
    return [];
  }
}
