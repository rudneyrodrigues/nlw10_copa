import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useEffect, useState } from "react";

import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

type UserProps = {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export interface AuthContextDataProps {
  user: UserProps;
  userIsLoading: boolean;
  signIn: () => Promise<void>;
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
    try {
      setUserIsLoading(true);

      const tokenResponse = await (await api.post('/users', { access_token })).data;
      api.defaults.headers.common['Authorization'] = `Bearer ${tokenResponse.token}`;

      const userInfoResponse = await (await api.get('/me')).data;

      await AsyncStorage.setItem('@user', JSON.stringify(userInfoResponse));

      setUser(userInfoResponse.user);
    } catch (error) {
      console.log(error.message);
      throw error;
    } finally {
      setUserIsLoading(false);
    }
  }

  useEffect(() => {
    const getUserAsyncStorage = async () => {
      const user = await AsyncStorage.getItem('@user');

      if (user !== null) {
        setUser(JSON.parse(user));
      }
    }

    getUserAsyncStorage();

    if (res?.type === 'success' && res.authentication?.accessToken) {
      signInWithGoogle(res.authentication.accessToken);
    }
  }, [res])

  return (
    <AuthContext.Provider value={{
      signIn, user, userIsLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}
