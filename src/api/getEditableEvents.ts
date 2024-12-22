import axios from "axios";
import { API_URL } from "@env";
import getHeaders from "@/utils/getHeaders";

export default async (id: string) => {
  const headers = await getHeaders();
  const { data } = await axios.get(
    `${API_URL}/events/${id}/can-update`,
    headers
  );
  return data;
};
