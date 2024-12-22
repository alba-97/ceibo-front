import axios from "axios";
import { API_URL } from "@env";
import CategoryResponse from "@/interfaces/responses/Category";

export default async () => {
  const { data } = await axios.get<CategoryResponse[]>(
    `${API_URL}/categories/`
  );
  return data;
};
