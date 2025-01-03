import { API_URL } from "@env";
import axios from "axios";

interface IImageResponse {
  imageUrl: string;
}

export default async (uri: string) => {
  const fileName = uri.split("/").pop();
  const response = await fetch(uri);
  const blob = await response.blob();

  const formData = new FormData();
  formData.append("image", blob, fileName || "upload.jpg");

  const { data } = await axios.post<IImageResponse>(
    `${API_URL}/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data.imageUrl;
};
