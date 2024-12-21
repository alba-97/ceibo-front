import axios from "axios";
import { API_URL } from "@env";

export async function getAllPlans() {
  try {
    const { data } = await axios.get(`${API_URL}/events`);
    return data;
  } catch (error) {
    return [];
  }
}
