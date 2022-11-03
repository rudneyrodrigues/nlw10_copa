import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { Center, NativeBaseProvider, StatusBar } from 'native-base';
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from './src/components/Loading';

import { theme } from './src/styles/theme';
import { SignIn } from './src/screens/SignIn';

SplashScreen.preventAutoHideAsync();

const App = (): JSX.Element => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          Roboto_400Regular,
          Roboto_500Medium,
          Roboto_700Bold
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {!appIsReady ? <Loading /> : <SignIn onLayout={onLayoutRootView} />}
    </NativeBaseProvider>
  );
}

export default App;
