import { API_URL } from "@env";
import axios from "axios";
import UserResponse from "@/interfaces/responses/User";

export const getAllUsers = async () => {
  const { data } = await axios.get<UserResponse[]>(`${API_URL}/users`);
  return data;
};