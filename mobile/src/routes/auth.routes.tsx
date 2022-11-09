import { createNativeStackNavigator  } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';
import { New } from '../screens/New';
import { Find } from '../screens/Find';
import { Pools } from '../screens/Pools';

export type RootStackParamList = {
  SignIn: undefined;
  New: undefined;
  Find: undefined;
  Pools: undefined;
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
      initialRouteName='Pools'
    >
      <Screen name="SignIn" component={SignIn} />
      <Screen name="New" component={New} />
      <Screen name="Find" component={Find} />
      <Screen name="Pools" component={Pools} />
    </Navigator>
  )
}
