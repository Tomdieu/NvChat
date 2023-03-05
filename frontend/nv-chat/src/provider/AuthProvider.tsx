import { AuthContext } from "context/AuthContext";
import React, { useEffect, useState } from "react";
import { UserProfile } from "types/UserProfile";
import ApiService from "utils/ApiService";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = (props: Props) => {
  const { children } = props;
  const [userProfile, setUserProfile] = useState<null | UserProfile>(null);
  const [userToken, setUserToken] = useState<null | string>(null);

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
        userProfile,
        setUserProfile,
        login,
        logout,
        userToken,
        setUserToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
