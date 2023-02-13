import { createContext } from "react";

export const AuthContext = createContext()

export const useAuthContext = () => useAuthContext(AuthContext)