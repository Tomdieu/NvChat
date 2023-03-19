import { Alert, AlertColor, SnackbarCloseReason } from "@mui/material";
import SnackBar from "Components/SnackBar";
import ApiService from "utils/ApiService";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "types/UserProfile";

type AuthContextType = {
  userToken: string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  login: (username: string, password: string) => Promise<Response>;
  logout: () => void;
  setSeverity: React.Dispatch<React.SetStateAction<AlertColor>>;
  setIcon: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  showBar: (
    message: string,
    icon: React.ReactNode,
    severity: AlertColor
  ) => void;
};

export const AuthContext = createContext<AuthContextType>(null);
AuthContext.displayName = "AuthContext";

export const useAuth = () => useContext(AuthContext);

type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider = (props: Props) => {
  const { children } = props;
  const [userToken, setUserToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const [severity, setSeverity] = useState<AlertColor>("success");
  const [icon, setIcon] = useState<React.ReactNode>(null);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = useState(null);

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

  const handleClose = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleCloseAlert = (event: React.SyntheticEvent<Element, Event>) => {
    setOpen(false);
  };

  const showBar = (
    message: string,
    icon: React.ReactNode,
    severity: AlertColor
  ) => {
    setOpen(true);
    setMessage(message);
    setIcon(icon);
    setSeverity(severity);
  };
  return (
    <AuthContext.Provider
      value={{
        userToken,
        setUserToken,
        userProfile,
        setUserProfile,
        login,
        logout,
        setSeverity,
        setIcon,
        setOpen,
        setMessage,
        showBar,
      }}
    >
      <>
        {children}
        <SnackBar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            severity={severity}
            icon={icon}
            onClose={handleCloseAlert}
            sx={(theme) => ({
              padding: theme.spacing(2),
              fontSize: 18,
              alignItems: "center",
              justifyContent: "space-between",
            })}
          >
            {message}
          </Alert>
        </SnackBar>
      </>
    </AuthContext.Provider>
  );
};
