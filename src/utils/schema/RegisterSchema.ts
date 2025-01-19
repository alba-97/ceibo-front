import * as Yup from "yup";

const phoneRegExp =
  /^(\+?\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*_=+-?\/\\.,<>~`|]).{8,}$/;
const base64ImageRegex =
  /^data:image\/(png|jpg|jpeg);base64,[A-Za-z0-9+/]+={0,2}$/;

export default Yup.object().shape({
  username: Yup.string().max(20).required("Username is required"),
  password: Yup.string()
    .matches(
      passwordRegExp,
      "Password must be at least 8 characters, contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 symbol"
    )
    .required("Password is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  phone: Yup.string()
    .matches(phoneRegExp, "Invalid phone number format")
    .optional(),
  birthdate: Yup.string()
    .test(
      "is-date",
      "Birthdate must be a valid date",
      (value) => value !== undefined && !isNaN(Date.parse(value))
    )
    .test(
      "is-before-today",
      "Birthdate must be less than today",
      function (value) {
        const birthdate = value !== undefined ? Date.parse(value) : undefined;
        return birthdate === undefined || birthdate < Date.now();
      }
    )
    .optional(),
  first_name: Yup.string().max(50).optional(),
  last_name: Yup.string().max(50).optional(),
  address: Yup.string().max(100).optional(),
  profile_img: Yup.string()
    .test(
      "is-base64-image",
      "Must be a valid image",
      (value?: string) => !value || base64ImageRegex.test(value)
    )
    .optional(),
});
