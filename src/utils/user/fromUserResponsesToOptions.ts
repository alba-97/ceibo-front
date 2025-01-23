import UserResponse from "@/interfaces/responses/User";
import fromUserResponseToOption from "./fromUserResponseToOption";

export default (users: UserResponse[]) => {
  return users.map((user: UserResponse) => fromUserResponseToOption(user));
};
