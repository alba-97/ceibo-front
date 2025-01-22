import IOptionSelect from "@/interfaces/OptionSelect";
import UserResponse from "@/interfaces/responses/User";

export default (user: UserResponse) => {
  return {
    id: user._id,
    name: user.email,
  } as IOptionSelect;
};
