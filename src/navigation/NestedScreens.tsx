import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes } from '@types';
import BottomTabs from './BottomTabs';
import AdDetailsScreen from '@screens/AdDetailsScreen/AdDetailsScreen';

const RootStackNav = createNativeStackNavigator();
const NestedScreen = () => {
  return (
    <RootStackNav.Navigator screenOptions={{ headerShown: false }}>
      <RootStackNav.Screen name={Routes.BottomTabs} component={BottomTabs} />
      <RootStackNav.Screen name={Routes.AdDetails} component={AdDetailsScreen} />

    </RootStackNav.Navigator>
  );
};

export default NestedScreen;
