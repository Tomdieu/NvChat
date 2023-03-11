import { createContext, useContext } from "react";
import { Conversation } from "types/ConversationSerializer";
import { GroupSerializer } from "types/GroupSerializer";

type chatContextType = {
  selectedButton:
    | "chat"
    | "group"
    | "post"
    | "friends"
    | "settings"
    | "notifications";
  setSelectedButton: React.Dispatch<
    React.SetStateAction<
      "chat" | "group" | "post" | "friends" | "settings" | "notifications"
    >
  >;
  handleClick: (
    option: "chat" | "group" | "post" | "friends" | "settings" | "notifications"
  ) => void;
  selectedChatType: "discussion" | "group" | "post";
  setSelectedChatType: React.Dispatch<
    React.SetStateAction<"discussion" | "group" | "post">
  >;
  selectedDiscussion: Conversation;
  setSelectedDiscussion: React.Dispatch<React.SetStateAction<Conversation>>;
  selectedGroup: GroupSerializer;
  setSelectedGroup: React.Dispatch<React.SetStateAction<GroupSerializer>>;
  isRightOpen: Boolean;
  setIsRightOpen: React.Dispatch<React.SetStateAction<Boolean>>;
  discussionsList: Conversation[];
  setDiscussionsList: React.Dispatch<React.SetStateAction<[] | Conversation[]>>;
  groupsList: GroupSerializer[];
  setGroupsList: React.Dispatch<React.SetStateAction<[] | GroupSerializer[]>>;
  discussionId: number;
  setDiscussionId: React.Dispatch<React.SetStateAction<number>>;
  toggleRight: () => void;
  getGroups: () => void;
  getDiscussions: () => void;
};

export const ChatContext = createContext<null | chatContextType>(null);

export const useChatContext = () => useContext(ChatContext);
