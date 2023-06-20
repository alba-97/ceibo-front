import axios from "axios";
import { API_URL, PORT } from "@env";

export async function getCategories() {
  try {
    const res = await axios.get(`${API_URL}:${PORT}/api/categories/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
