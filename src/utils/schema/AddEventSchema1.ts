import * as Yup from "yup";

const base64ImageRegex =
  /^data:image\/(png|jpg|jpeg);base64,[A-Za-z0-9+/]+={0,2}$/;

export default Yup.object().shape({
  title: Yup.string().max(100).required("Title is required"),
  description: Yup.string().max(500).required("Description is required"),
  location: Yup.string().max(100).required("Location is required"),
  start_date: Yup.string()
    .test(
      "is-date",
      "Start date must be a valid date",
      (value) => value !== undefined && !isNaN(Date.parse(value))
    )
    .test("is-future-date", "Start date must be in the future", (value) => {
      if (value === undefined) return false;
      const today = new Date();
      const startDate = new Date(value);
      return startDate >= today;
    })
    .required("Start date is required"),
  end_date: Yup.string()
    .test(
      "is-date",
      "End date must be a valid date",
      (value) => value !== undefined && !isNaN(Date.parse(value))
    )
    .test(
      "is-after-start-date",
      "End date must be after start date",
      (value, { parent }) => {
        const startDate = parent.start_date;
        const endDate = value !== undefined ? Date.parse(value) : undefined;
        return endDate !== undefined && endDate >= Date.parse(startDate);
      }
    )
    .required("End date is required"),

  img: Yup.string()
    .test(
      "is-base64-image",
      "Must be a valid image",
      (value?: string) => !value || base64ImageRegex.test(value)
    )
    .optional(),
});
