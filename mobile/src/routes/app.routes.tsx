import { useTheme } from "native-base";
// import { Platform } from 'react-native';
import { PlusCircle, SoccerBall } from 'phosphor-react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { New } from '../screens/New';
import { Find } from '../screens/Find';
import { Pools } from '../screens/Pools';

export type RootTabParamList = {
  New: undefined;
  Pools: undefined;
  Find: undefined;
}

const { Navigator, Screen } = createBottomTabNavigator<RootTabParamList>();

export const AppRoutes = () => {
  const { colors, sizes } = useTheme();

  const sizeIcon = sizes[6];

  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          if (route.name === 'New') {
            return <PlusCircle color={color} size={sizeIcon} />;
          } else if (route.name === 'Pools') {
            return <SoccerBall color={color} size={sizeIcon} />;
          }
        },
        tabBarItemStyle: {
          position: "relative",
          // top: Platform.OS === 'android' ? 0 : 0,
        },
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: colors.yellow[500],
        tabBarInactiveTintColor: colors.gray[300],
        tabBarStyle: {
          position: "absolute",
          height: sizes[16],
          borderTopWidth: 0,
          backgroundColor: colors.gray[800]
        },
      })}
      initialRouteName='New'
    >
      <Screen name="New" component={New} options={{
        tabBarLabel: 'Novo bolão'
      }} />
      <Screen name="Pools" component={Pools} options={{
        tabBarLabel: 'Meus bolões'
      }} />
      <Screen name="Find" component={Find} options={{
        tabBarButton: () => null
      }} />
    </Navigator>
  )
}
