import { createContext, useContext } from "react";

export const LangContext = createContext()

export const useLanContext = () => useContext(LangContext)