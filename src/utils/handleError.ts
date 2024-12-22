import { AxiosError } from "axios";
import { ToastAndroid } from "react-native";

export default (error: unknown) => {
  if (error instanceof AxiosError) {
    ToastAndroid.show(
      error.response?.data.message || "An error occurred",
      ToastAndroid.LONG
    );
  } else if (error instanceof Error) {
    ToastAndroid.show(error.message, ToastAndroid.LONG);
  }
};
