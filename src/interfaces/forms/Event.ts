export default interface EventForm {
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  category: string;
  min_age: number | null;
  max_age: number | null;
  min_to_pay: number | null;
  total_to_pay: number | null;
  link_to_pay?: string;
  img: string;
  private: boolean;
}
