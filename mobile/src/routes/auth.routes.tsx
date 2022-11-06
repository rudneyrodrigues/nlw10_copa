import { createNativeStackNavigator  } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';

export type RootStackParamList = {
  SignIn: undefined;
}

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export const AuthRoutes = (): JSX.Element => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: "#121214",
        }
      }}
      initialRouteName='SignIn'
    >
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  )
}
