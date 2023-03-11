import { UserProfile } from "./UserProfile";

export interface Group {
    id: number;
    chat_name: string;
    members: UserProfile[];
    created_by:UserProfile;
    image:string;
  }