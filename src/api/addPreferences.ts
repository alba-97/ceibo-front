import axios from "axios";
import { API_URL } from "@env";
import CategoryForm from "@/interfaces/forms/Category";
import getHeaders from "@/utils/getHeaders";

export default async (preferences: CategoryForm[]) => {
  const headers = await getHeaders();
  const { status } = await axios.post(
    `${API_URL}/users/preferences/`,
    preferences,
    headers
  );
  return status;
};
