import { FileMessage, ImageMessage, TextMessage, VideoMessage } from "./AbstractMessage";
import { Group } from "./Group";

export type GroupMessage = {
    id: number;
    chat: Group;
    parent_message:GroupMessage;
    message: TextMessage | ImageMessage | VideoMessage | FileMessage;
    created_at: string;
    updated_at: string;
  }
