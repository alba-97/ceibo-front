import CategoryResponse from "./Category";
import CommentResponse from "./Comment";
import UserResponse from "./User";

export interface EventResponse {
  _id: string | null;
  title: string;
  description: string;
  location: string;
  start_date: string;
  end_date: string;
  img: string;
  category: CategoryResponse | null;
  comments: CommentResponse[];
  organizer: UserResponse | null;
  ended: boolean;
  private: boolean;
}
