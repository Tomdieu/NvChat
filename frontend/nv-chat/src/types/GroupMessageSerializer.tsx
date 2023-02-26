import { FileMessage, ImageMessage, TextMessage, VideoMessage } from "./AbstractMessage";
import { Group } from "./Group";
import { GroupMessageView } from "./GroupMessageView";

export type GroupMessageSerializer = {
    id: number;
    // chat: Group;
    parent_message:null|GroupMessageSerializer;
    message: TextMessage | ImageMessage | VideoMessage | FileMessage;
    created_at: string;
    updated_at: string;
    view_by:null|GroupMessageView[]
  }