import { createContext, useContext } from "react";

import { UserProfile } from "types/UserProfile";

type authType = {
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  userToken: null|string;
  setUserToken: React.Dispatch<React.SetStateAction<string>>;
  login: (username:string,password:string)=>Promise<Response>;
  logout: ()=>void;
};

export const AuthContext = createContext<null|authType>(null);

export const useAuthContext = () => useContext(AuthContext);
