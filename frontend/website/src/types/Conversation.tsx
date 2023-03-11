import { UserProfile } from "./UserProfile";

export interface Conversation{
    participants:UserProfile[];
    created_at:string;
}