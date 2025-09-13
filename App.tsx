import React, { useEffect, useState } from "react";
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { loadLanguage } from "./src/locales/i18n";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { BottomSheetProvider } from '@contexts/bottomSheetContext';
import Toast from 'react-native-toast-message';
import { ToastListener } from '@components/ToastListener/ToastListener';
import { Text } from "@components";
import RootNavigator from "@navigation/RootNavigator";

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      await loadLanguage(); // load from AsyncStorage
      setReady(true);
    })();
  }, []);

  if (!ready) return <Text>Loading...</Text>;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <BottomSheetModalProvider>
            <BottomSheetProvider>
              <RootNavigator />
              <Toast />
              <ToastListener />
            </BottomSheetProvider>
          </BottomSheetModalProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}