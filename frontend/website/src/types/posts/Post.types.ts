import { IMessage } from "types/AbstractMessage";
import { UserProfile } from "types/UserProfile";

export type Image = {
  image: string;
  id?: number;
};

export type Video = {
  video: string;
  id?: number;
};

export type File = {
  file: string;
  id?: number;
};

export type Location = {
  lat: Float32Array;
  lng: Float32Array;
  id?: number;
};

export type Post = {
  id?: number;

  author: UserProfile;
  title: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
  images?: Image[];
  files?: File[];
  video?: Video[];
  is_comment_able: boolean;
  views?: PostView[];
  comments?: PostComment[];
};

export type PostView = {
  id?: number;

  post: Post;
  view_by: UserProfile;
  timestamp: string;
};

export type Like = {
  id?: number;

  user: UserProfile;
  reaction: string;
  created_at: string;
  updated_at: string;
};

export interface PostLike extends Like {
  id?: number;

  post: Post;
}

export type PostComment = {
  id?: number;

  post: Post;
  parent_comment: PostComment;
  author: UserProfile;
  content: IMessage;
  replies: PostComment[];
  created_at: string;
  updated_at: string;
  likes: CommentLike[];
};

export interface CommentLike extends Like {
  id?: number;
  comment: PostComment;
}

export type Follower = {
  id?: number;

  user: UserProfile;
  followers: UserProfile;
  created_at: string;
};
