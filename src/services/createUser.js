import axios from "axios";
import { API_URL } from "@env";

export async function createNewUser(user) {
  try {
    const res = await axios.post(`${API_URL}/users/signup`, user);
    return res.data;
  } catch (error) {
    throw error;
  }
}
