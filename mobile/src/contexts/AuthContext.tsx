import { createContext, ReactNode, useState } from "react";
import * as AuthSession from 'expo-auth-session';

type UserProps = {
  name: string;
  avatarUrl?: string;
  email: string;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserProps;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserProps>({} as UserProps);

  console.log(AuthSession.makeRedirectUri({ useProxy: true }))

  const signIn = async () => {}

  const signOut = async () => {}

  return (
    <AuthContext.Provider value={{
      signIn, signOut, user
    }}>
      {children}
    </AuthContext.Provider>
  )
}
