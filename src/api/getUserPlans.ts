import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";

export default async () => {
  const headers = await getHeaders();
  const { data } = await axios.get(`${API_URL}/events/my-events`, headers);
  return data;
};
