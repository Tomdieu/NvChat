export interface IMessage {
  id: number;
  // polymorphic_ctype: number;
  resourcetype: "TextMessage" | "ImageMessage" | "VideoMessage" | "FileMessage";
  created_at: Date;
  updated_at: Date;
  // type: "text" | "image" | "video"|"file"
}

export interface TextMessage extends IMessage {
  // type: "text";
  resourcetype:"TextMessage";
  text: string;
}

export interface ImageMessage extends IMessage {
  // type: "image";
  resourcetype:"ImageMessage";

  image: string;
  caption?: string;
}

export interface VideoMessage extends IMessage {
  // type: "video";
  resourcetype:"VideoMessage";
  video: string;
  caption?: string;
}

export interface FileMessage extends IMessage {
  // type: "file";
  resourcetype:"FileMessage";

  file: string;
  caption?: string;
}
