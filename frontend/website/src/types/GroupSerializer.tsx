import { GroupMember } from "./GroupMember";
import { GroupMessage } from "./GroupMessage";
import { GroupMessageSerializer } from "./GroupMessageSerializer";
import { UserProfile } from "./UserProfile";

export type GroupSerializer = {
  members?: string;
  id: number;
  group_members: GroupMember[];
  created_by: UserProfile;
  latest_message: null | GroupMessageSerializer;
  messages: GroupMessageSerializer[];
  chat_name: string;
  image: string;
  description: string;
  created_on: string;
  updated_on: string;
};
