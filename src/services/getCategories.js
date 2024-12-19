import axios from "axios";
import { API_URL } from "@env";

export async function getCategories() {
  try {
    const res = await axios.get(`${API_URL}/categories/`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
