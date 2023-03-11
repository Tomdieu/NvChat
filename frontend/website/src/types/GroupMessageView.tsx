import { GroupMessage } from "./GroupMessage";
import { UserProfile } from "./UserProfile";

export interface GroupMessageView{
    id:number;
    viewer:UserProfile;
    message:GroupMessage;
    viewed_at:string;
}