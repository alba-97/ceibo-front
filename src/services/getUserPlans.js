import axios from "axios";
import { API_URL, PORT } from "@env";

export async function getUserPlans() {
  try {
    const userPlans = await axios.get(
      `${API_URL}:${PORT}/api/events/my-events`
    );
    return userPlans.data;
  } catch (error) {
    throw Error(error);
  }
}
