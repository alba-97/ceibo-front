import axios from "axios";
import { API_URL } from "@env";
import Paginated from "@/interfaces/Paginated";
import CategoryResponse from "@/interfaces/responses/Category";

export default async () => {
  const { data } = await axios.get<Paginated<CategoryResponse>>(
    `${API_URL}/categories/`
  );
  return data;
};
