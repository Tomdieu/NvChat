import { createContext, useContext } from "react";

export const ChatContext = createContext();

export const useChatContext = () => {
  return useContext(ChatContext);
};
