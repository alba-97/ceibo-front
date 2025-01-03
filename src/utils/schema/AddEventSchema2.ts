import * as Yup from "yup";

export default Yup.object().shape({
  min_age: Yup.number()
    .typeError("Min age must a valid number")
    .min(0, "Min age must be greater than 0"),
  max_age: Yup.number()
    .typeError("Max age must a valid number")
    .min(Yup.ref("min_age"), "Max age must be greater than min age")
    .max(150, "Max age must a valid number"),
  min_to_pay: Yup.number()
    .typeError("Min to pay must a valid number")
    .min(0, "Min to pay must be greater than 0"),
  total_to_pay: Yup.number()
    .typeError("Total to pay must a valid number")
    .min(Yup.ref("min_to_pay"), "Total to pay must be greater than min to pay"),
  category: Yup.string().required("Category is required"),
  link_to_pay: Yup.string().url("Link to pay must be a valid url"),
  private: Yup.boolean(),
});
