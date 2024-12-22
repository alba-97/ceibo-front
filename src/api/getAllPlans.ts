import axios from "axios";
import { API_URL } from "@env";

export default async () => {
  const { data } = await axios.get(`${API_URL}/events`);
  return data;
};
