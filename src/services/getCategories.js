import axios from "axios";
import { API_URL, PORT } from "@env";

export async function getCategories() {
  try {
    const res = await axios.get(`${API_URL}:${PORT}/api/categories/`);
    return res.data.map((item, index) => ({ key: index, value: item.name }));
  } catch (error) {
    console.error(error);
  }
}
