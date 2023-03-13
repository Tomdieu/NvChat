import ApiService from "Utils/ApiService";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "types/UserProfile";

type AuthContextType = {
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  login: (username: string, password: string) => Promise<Response>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>(null);

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider = (props: Props) => {
  const { children } = props;
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const login = async (username: string, password: string) => {
    const res = await ApiService.login(username, password);
    return res;
  };
  const logout = () => {
    setUserProfile(null);
    setUserToken(null);

    localStorage.clear();
  };

  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("userProfile", JSON.stringify(userProfile));
    }
  }, [userProfile]);

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("userToken", userToken);
    }
  }, [userToken]);

  useEffect(() => {
    const profile = localStorage.getItem("userProfile");
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
        userProfile,
        setUserProfile,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
