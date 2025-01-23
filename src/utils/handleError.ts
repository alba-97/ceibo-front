import { AxiosError } from "axios";
import { toast } from "react-toastify";

export default (error: unknown) => {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data.message || "An error occurred");
  } else if (error instanceof Error) {
    toast.error(error.message);
  }
};
