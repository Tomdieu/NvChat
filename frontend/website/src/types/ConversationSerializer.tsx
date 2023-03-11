import { Message } from "./Message";
import { UserProfile } from "./UserProfile";

export type Conversation = {
  id: number;
  participants: Array<UserProfile>;
  title: string;
  latest_message: null | Message;
  messages: Array<Message>;
  imageUrl: string;
  created_at: string;
};
