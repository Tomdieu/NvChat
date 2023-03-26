import { GroupSerializer } from "./GroupSerializer";
import { Message } from "./Message";
import { UserProfile } from "./UserProfile";

export type Conversation = {
  id: number;
  user: UserProfile;
  participants: Array<UserProfile>;
  title: string;
  latest_message: null | Message;
  messages: Array<Message>;
  imageUrl: string;
  created_at: string;
  online: boolean;
  groups_in_common?: GroupSerializer[];
};
