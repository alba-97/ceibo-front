import UserResponse from "@/interfaces/responses/User";
import fromResponseToOption from "./fromResponseToOption";

export default (users: UserResponse[]) => {
  return users.map((user: UserResponse) => fromResponseToOption(user));
};
