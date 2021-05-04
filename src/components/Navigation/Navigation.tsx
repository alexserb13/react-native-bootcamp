import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from 'screens/Login';
import { MapScreen } from 'screens/Map';
import { useAuthContext } from 'context/AuthContext';
import { useDarkThemeContext } from 'context/DarkThemeContext';

import { Loading } from '../Loading';
import { DrawerNavigation } from './DrawerNavigation';

const Stack = createStackNavigator();

export const Navigation: FC = () => {
  const { token, isChecking } = useAuthContext();
  const { isDarkTheme } = useDarkThemeContext();

  if (isChecking) {
    return <Loading />;
  }

  if (!token) {
    return <LoginScreen />;
  }

  return (
    <>
      <StatusBar barStyle={isDarkTheme ? 'light-content' : 'dark-content'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Root"
          component={DrawerNavigation}
          options={{ title: 'Library' }}
        />
        <Stack.Screen
          name="MapView"
          component={MapScreen}
          options={{ headerShown: true, title: 'Map View' }}
        />
      </Stack.Navigator>
    </>
  );
};
