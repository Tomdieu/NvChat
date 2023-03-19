import React, { createContext, useContext, useEffect, useState } from "react";
import ApiService from "utils/ApiService";
import { Conversation } from "types/ConversationSerializer";

type ChatContextTypes = {
  discussions: Conversation[];
  setDiscussions: React.Dispatch<React.SetStateAction<Conversation[]>>;
  selectedDiscussion: Conversation;
  setSelectedDiscussion: React.Dispatch<React.SetStateAction<Conversation>>;
  chatId: number;
  setChatId: React.Dispatch<React.SetStateAction<number>>;
  isRightOpen: boolean;
  setIsRightOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChatContext = createContext<ChatContextTypes>(null);

ChatContext.displayName = "ChatContext";

export const useChat = () => useContext(ChatContext);

type ChatProviderProps = {
  children: React.ReactNode;
};

export const ChatProvider = (props: ChatProviderProps) => {
  const { children } = props;
  const [discussions, setDiscussions] = useState<Conversation[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<Conversation>(null);
  const [chatId, setChatId] = useState<number>(null);
  const [isRightOpen, setIsRightOpen] = useState<boolean>(false);

  return (
    <ChatContext.Provider
      value={{
        discussions,
        setDiscussions,
        selectedDiscussion,
        setSelectedDiscussion,
        chatId,
        setChatId,
        isRightOpen,
        setIsRightOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
