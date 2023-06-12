import { API_URL, PORT } from "@env";
import axios from "axios";

export async function getAllUsers() {
  const allUsers = await axios.get(`${API_URL}:${PORT}/api/users`);
  return allUsers.data;
}
