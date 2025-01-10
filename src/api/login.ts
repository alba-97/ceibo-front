import axios from "axios";
import { API_URL } from "@env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginForm from "@/interfaces/forms/Login";

export default async (loginData: LoginForm) => {
  const { data } = await axios.post(`${API_URL}/users/login`, loginData);
  await AsyncStorage.setItem("token", data.token);
  return data;
};
