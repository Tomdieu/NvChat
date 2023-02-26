import { GroupMember } from "./GroupMember";
import { GroupMessage } from "./GroupMessage";
import { UserProfile } from "./UserProfile";

export type GroupSerializer = {
  id: number;
  members: GroupMember[];
  created_by: UserProfile;
  latest_message: null | GroupMessage;
  messages: GroupMessage[];
  chat_name: string;
  image: string;
};
