import EventForm from "@/interfaces/forms/Event";
import getHeaders from "@/utils/getHeaders";
import { API_URL } from "@env";
import axios from "axios";

export default async (invited: string[], plan: EventForm, method: string) => {
  const headers = await getHeaders();
  await axios.post(
    `${API_URL}/users/invite`,
    {
      users: invited,
      plan,
      method,
    },
    headers
  );
};
