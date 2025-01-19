import { API_URL } from "@env";
import axios from "axios";

interface IImageResponse {
  imageUrl: string;
}

export default async (uri: string) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const formData = new FormData();
  formData.append("image", blob, "upload.jpg");

  const { data } = await axios.post<IImageResponse>(
    `${API_URL}/files`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.imageUrl;
};
