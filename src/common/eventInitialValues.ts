import EventForm from "@/interfaces/forms/Event";

const initialValues: EventForm = {
  title: "",
  description: "",
  location: "",
  start_date: new Date().toISOString(),
  end_date: new Date().toISOString(),
  img: "",
  min_age: "",
  max_age: "",
  min_to_pay: "",
  total_to_pay: "",
  category: "Default",
  link_to_pay: "",
  private: false,
};
export default initialValues;
