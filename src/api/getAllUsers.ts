import { API_URL } from "@env";
import axios from "axios";
import Paginated from "@/interfaces/Paginated";
import UserResponse from "@/interfaces/responses/User";

export default async () => {
  const { data } = await axios.get<Paginated<UserResponse>>(`${API_URL}/users`);
  return data;
};
