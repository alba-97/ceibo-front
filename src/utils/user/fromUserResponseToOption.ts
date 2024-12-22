import IOption from "@/interfaces/Option";
import UserResponse from "@/interfaces/responses/User";

export default (user: UserResponse) => {
  return {
    label: user.username,
    value: user.email,
  } as IOption;
};
