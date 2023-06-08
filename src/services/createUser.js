import axios from "axios";
import { API_URL, PORT } from "@env";

export async function createNewUser(user) {
  try {
    const NewUser = await axios.post(
      `${API_URL}:${PORT}/api/users/signup`,
      user
    );
    return NewUser.data;
  } catch (error) {
    throw Error(error);
  }
}
