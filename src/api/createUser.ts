import axios from "axios";
import { API_URL } from "@env";
import UserForm from "@/interfaces/forms/User";

export async function createNewUser(user: UserForm) {
  try {
    const res = await axios.post(`${API_URL}/users/signup`, user);
    return res.data;
  } catch (error) {
    throw error;
  }
}
