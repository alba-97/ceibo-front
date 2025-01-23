import { API_URL } from "@env";
import axios from "axios";
import getHeaders from "@/utils/getHeaders";

export default async (id: string) => {
  const headers = await getHeaders();
  await axios.delete(`${API_URL}/events/stop-participating/${id}`, headers);
};
