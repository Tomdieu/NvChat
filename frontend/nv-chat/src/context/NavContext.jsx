import { createContext, useContext } from "react";

export const NavContext = createContext();

export const useNavContext = () => {
  return useContext(NavContext);
};
