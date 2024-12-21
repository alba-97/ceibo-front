import CategoryResponse from "./Category";
import CommentResponse from "./Comment";
import UserResponse from "./User";

export interface EventResponse {
  _id: string;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  img: string;
  category: CategoryResponse;
  comments: CommentResponse[];
  organizer: UserResponse;
  ended: boolean;
  private: boolean;
}
