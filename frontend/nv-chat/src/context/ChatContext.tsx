import { createContext, useContext } from "react";

export const ChatContext = createContext(null);

export const useChatContext = () => useContext(ChatContext);