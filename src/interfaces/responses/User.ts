import CategoryResponse from "./Category";
import EventResponse from "./Event";

export default interface UserResponse {
  _id: string;
  email: string;
  username: string;
  address: string;
  birthdate: string;
  first_name: string;
  last_name: string;
  phone: string;
  profile_img: string;
  events: EventResponse[];
  preferences: CategoryResponse[];
  rating?: number;
  new_user?: boolean;
}
