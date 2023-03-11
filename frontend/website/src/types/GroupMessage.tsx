import {
  FileMessage,
  ImageMessage,
  TextMessage,
  VideoMessage,
} from "./AbstractMessage";
import { Group } from "./Group";
import { UserProfile } from "./UserProfile";

export type GroupMessage = {
  id: number;
  chat: Group;
  parent_message: GroupMessage;
  message: TextMessage | ImageMessage | VideoMessage | FileMessage;
  sender: UserProfile;
  created_at: string;
  updated_at: string;
};
