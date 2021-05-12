import React, { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useThemeContext } from 'contexts';
import { BadgeScreen, BookHistoryScreen, LibrariesScreen } from 'screens';

import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

export const DrawerNavigation :FC = () => {
  const { theme: { colors } } = useThemeContext();

  return (
    <Drawer.Navigator
      minSwipeDistance={50}
      initialRouteName="MemberInfo"
      screenOptions={{
        headerShown: true,
        headerTintColor: colors.text,
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="MemberInfo"
        component={BadgeScreen}
        options={{
          title: 'My badge ID',
          drawerLabel: 'My badge ID',
          drawerIcon: ({ size, color }) => (
            <Icon
              name="account-details-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="BookHistory"
        component={BookHistoryScreen}
        options={{
          title: 'Book History',
          drawerLabel: 'Book History',
          drawerIcon: ({ size, color }) => (
            <Icon
              name="book-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Libraries"
        component={LibrariesScreen}
        options={{
          title: 'Look for Libraries',
          drawerLabel: 'Look for Libraries',
          drawerIcon: ({ size, color }) => (
            <Icon
              name="bookshelf"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
