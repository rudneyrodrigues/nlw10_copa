import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { createContext, ReactNode, useEffect, useState } from "react";

WebBrowser.maybeCompleteAuthSession();

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
  userIsLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export const AuthContextProvider = ({ children }: AuthContextProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [userIsLoading, setUserIsLoading] = useState(false);

  const [req, res, promptAsync] = Google.useAuthRequest({
    clientId: "12265716675-hqf3rt4pju5vju3skospqhjknfnk2aqv.apps.googleusercontent.com",
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email'],
  })

  const signIn = async () => {
    try {
      setUserIsLoading(true);

      await promptAsync();
    } catch (error) {
      console.log(error.message);
      throw error;
    } finally {
      setUserIsLoading(false);
    }
  }

  const signInWithGoogle = async (access_token: string) => {
    console.log("Token:", access_token);
  }

  useEffect(() => {
    if (res?.type === 'success' && res.authentication?.accessToken) {
      signInWithGoogle(res.authentication.accessToken);
    }
  }, [res])

  const signOut = async () => {}

  return (
    <AuthContext.Provider value={{
      signIn, signOut, user, userIsLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}
