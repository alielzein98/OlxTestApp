import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Routes } from '@types';
import { Icon } from '@components';

import HomeScreen from '@screens/HomeScreen';
import SearchScreen from '@screens/SearchScreen';
import MyAdsScreen from '@screens/MyAdsScreen';
import ProfileScreen from '@screens/ProfileScreen';
import { colors } from '@constants/Colors';
import { spacing } from '@constants/Spacing';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  const { t } = useTranslation();
  const tabBarItems = [
    {
      route: Routes.HomeScreen,
      title: t('home'),
      icon: 'home',
      component: HomeScreen,
    },
    {
      route: Routes.SearchScreen,
      title: t('search'),
      icon: 'search',
      component: SearchScreen,
    },
    {
      route: Routes.MyAdsScreen,
      title: t('my_ads'),
      icon: 'receipt',
      component: MyAdsScreen,
    },
    {
      route: Routes.ProfileScreen,
      title: t('profile'),
      icon: 'person',
      component: ProfileScreen,
    },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 0,
          paddingVertical: 12,
        },
      }}
    >
      {tabBarItems.map((item, idx) => {
        return (
          <Tab.Screen
            key={idx}
            name={item.route}
            component={item.component}
            options={() => {
              return {
                title: item.title,
                tabBarLabelStyle: {
                  fontSize: 12,
                  lineHeight: 17,
                  fontWeight: '400',
                  letterSpacing: -0.5,
                },
                tabBarActiveTintColor: colors.primary.base,
                tabBarInactiveTintColor: colors.gray[600],
                tabBarIcon: ({ color }) => (
                  <Icon name={item.icon} color={color} size={26} />
                ),
                tabBarAllowFontScaling: false,
                tabBarButtonTestID: `tab-${item.route}`,

                tabBarStyle: {
                  backgroundColor: colors.background.default,
                  borderTopWidth: 0,
                  paddingVertical: spacing.sm,
                },
              };
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabs;
