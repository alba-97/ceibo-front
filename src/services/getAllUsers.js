import { API_URL } from "@env";
import axios from "axios";

export async function getAllUsers() {
  const allUsers = await axios.get(`${API_URL}/users`);
  return allUsers.data;
}
