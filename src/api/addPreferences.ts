import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";

export default async (preferences: string[]) => {
  const headers = await getHeaders();
  const { status } = await axios.post(
    `${API_URL}/users/preferences/`,
    preferences,
    headers
  );
  return status;
};
