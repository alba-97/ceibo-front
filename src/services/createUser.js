import axios from "axios";
import { API_URL, PORT } from "@env";

export async function createNewUser(user) {
  try {
    const res = await axios.post(`${API_URL}:${PORT}/api/users/signup`, user);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
