import axios from "axios";
import { API_URL } from "@env";
import UserResponse from "@/interfaces/responses/User";
import getHeaders from "@/utils/getHeaders";
import Paginated from "@/interfaces/Paginated";

export default async () => {
  const headers = await getHeaders();
  const { data } = await axios.get<Paginated<UserResponse>>(
    `${API_URL}/users/friends`,
    headers
  );
  return data;
};
