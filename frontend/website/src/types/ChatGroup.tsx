import { UserProfile } from "./UserProfile";

export interface ChatGroup {
  id: number;
  members: Array<UserProfile>;
  created_by: UserProfile;
  latest_message: string;
  chat_name: string;
  image: string;
  description: string;
  created_on: string;
  updated_on: string;
}
