import axios from "axios";
import { API_URL } from "@env";
import UserForm from "@/interfaces/forms/User";
import getHeaders from "@/utils/getHeaders";

export default async (data: Partial<UserForm>) => {
  const headers = await getHeaders();
  await axios.put(`${API_URL}/users/`, data, headers);
};
