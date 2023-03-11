import {
  FileMessage,
  ImageMessage,
  TextMessage,
  VideoMessage,
} from "./AbstractMessage";
import { Group } from "./Group";
import { GroupMessageView } from "./GroupMessageView";
import { UserProfile } from "./UserProfile";

export type GroupMessageSerializer = {
  id: number;
  parent_message: null | GroupMessageSerializer;
  message: TextMessage | ImageMessage | VideoMessage | FileMessage;
  sender: UserProfile;
  created_at: string;
  updated_at: string;
  view_by: null | GroupMessageView[];
};
