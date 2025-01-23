import UserForm from "@/interfaces/forms/User";
import UserResponse from "@/interfaces/responses/User";

export default (user: UserResponse): UserForm => {
  const {
    email,
    username,
    first_name,
    last_name,
    address,
    birthdate,
    phone,
    profile_img,
  } = user;
  return {
    email,
    password: "",
    username,
    first_name,
    last_name,
    address,
    birthdate,
    phone,
    profile_img,
  };
};
