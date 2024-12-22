import axios from "axios";
import { API_URL } from "@env";
import UserForm from "@/interfaces/forms/User";

export default async (user: UserForm) => {
  const { data } = await axios.post(`${API_URL}/users/signup`, user);
  return data;
};
