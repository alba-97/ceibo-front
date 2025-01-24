import UserResponse from "@/interfaces/responses/User";
import fromResponseToOptionSelect from "./fromResponseToOptionSelect";

export default (users: UserResponse[]) => {
  return users.map((user: UserResponse) => fromResponseToOptionSelect(user));
};
