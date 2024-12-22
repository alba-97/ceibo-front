import { API_URL } from "@env";
import axios from "axios";
import getHeaders from "@/utils/getHeaders";

export default async (id: string) => {
  const headers = await getHeaders();
  const { data } = await axios.post(
    `${API_URL}/events/enroll`,
    { eventId: id },
    headers
  );
  return data;
};
