import React, { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = (props: Props) => {
  const { children } = props;
};
