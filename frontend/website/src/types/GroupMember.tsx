import { Group } from "./Group"
import { UserProfile } from "./UserProfile"

export interface GroupMember {
    id:number;
    user:UserProfile;
    group:Group;
    is_active:Boolean;
    is_manager:Boolean;
    joined_on:string;
}