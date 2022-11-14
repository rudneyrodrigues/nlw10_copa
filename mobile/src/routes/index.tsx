import { NavigationContainer } from '@react-navigation/native';

import { SignIn } from '../screens/SignIn';
import { useAuth } from '../hooks/useAuth';
import { Background } from '../components/Background';

import { AppRoutes } from './app.routes';

export const Routes = (): JSX.Element => {
  const { user } = useAuth();

  return (
    <Background>
      <NavigationContainer>
        {user.name ? <SignIn /> : <AppRoutes />}
      </NavigationContainer>
    </Background>
  );
}
