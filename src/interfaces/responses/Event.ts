import CategoryResponse from "./Category";
import CommentResponse from "./Comment";
import UserResponse from "./User";

export default interface EventResponse {
  _id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  min_age?: number;
  max_age?: number;
  min_to_pay?: number;
  total_to_pay?: number;
  link_to_pay?: string;
  img: string;
  category: CategoryResponse;
  comments: CommentResponse[];
  organizer: UserResponse;
  ended: boolean;
  private: boolean;
}
