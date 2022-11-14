import { NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';

export const Routes = (): JSX.Element => {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}
