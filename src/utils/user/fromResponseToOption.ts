import IOption from "@/interfaces/Option";
import UserResponse from "@/interfaces/responses/User";

export default (user: UserResponse) => {
  return {
    key: user._id,
    label: user.username,
    value: user.username,
  } as IOption;
};
