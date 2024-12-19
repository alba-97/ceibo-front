import { EventResponse } from "./Event";
import UserResponse from "./User";

export default interface CommentResponse {
  _id: string | null;
  user: UserResponse;
  event: EventResponse;
  text: string;
}
