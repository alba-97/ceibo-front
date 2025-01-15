import * as Yup from "yup";

export default Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  birthdate: Yup.date().required("Birthdate is required"),
  first_name: Yup.string().required("First name is required"),
  last_name: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  profile_img: Yup.string().required("Profile image is required"),
});
