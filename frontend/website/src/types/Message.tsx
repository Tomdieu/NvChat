import {
  FileMessage,
  ImageMessage,
  TextMessage,
  VideoMessage,
} from "./AbstractMessage";
import { Conversation } from "./ConversationSerializer";
import { UserProfile } from "./UserProfile";

export type Message =  {
  id: number;
  conversation: Conversation;
  sender: UserProfile;
  parent_message: Message;
  message:  ImageMessage | TextMessage | VideoMessage | FileMessage;
  timestamp: string;
  is_read: boolean;
}
