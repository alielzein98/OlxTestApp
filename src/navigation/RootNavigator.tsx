import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { Routes } from '@types';
import NestedScreen from './NestedScreens';
import { navigationRef } from './navigationref';
import { RootState } from '@redux/store';
import { setIsAuthenticated, setIsGuest, setUser } from '@redux/slices/userSlice';
import AuthStack from './stacks/AuthStack';
import { IS_GUEST, USER_DATA } from '@constants/StorageKeys';
import { View } from 'react-native';
import { Text } from '@components';
import { setAppLoaded } from '@redux/slices/appSlice';
import { getFromStorage } from '@services/storageService';

const RootStack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isGuest, isAuthenticated } = useSelector((s: RootState) => s.user);
  const { appLoaded } = useSelector((s: RootState) => s.app);
  const [checking, setChecking] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const guest = await getFromStorage(IS_GUEST);
      const user = await getFromStorage(USER_DATA);
      if (guest) dispatch(setIsGuest(true));
      if (user) {
        dispatch(setUser(JSON.parse(user)));
        dispatch(setIsAuthenticated(true));
      }
      setChecking(false);
      dispatch(setAppLoaded(true));
    })();
  }, [dispatch]);

  if (checking) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      {!appLoaded &&
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Text>Loading...</Text>
        </View>}
      {!isAuthenticated && !isGuest && appLoaded && <AuthStack />}
      {(isAuthenticated || isGuest) && appLoaded && (
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen
            name={Routes.NestedScreen}
            component={NestedScreen}
          />
        </RootStack.Navigator>
      )}


    </NavigationContainer>
  );
};

export default RootNavigator;
