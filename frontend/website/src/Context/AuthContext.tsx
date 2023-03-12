import React, { createContext, useContext, useState } from "react";
import { UserProfile } from "types/UserProfile";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider = (props: Props) => {
  const { children } = props;
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <AuthContext.Provider
      value={{ userToken, setUserToken, userProfile, setUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
