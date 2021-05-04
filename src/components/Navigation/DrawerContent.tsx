import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {
  TouchableRipple,
  Switch,
  Text,
  Drawer,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthContext } from 'context/AuthContext';
import { useDarkThemeContext } from 'context/DarkThemeContext';

export const DrawerContent: FC<DrawerContentComponentProps> = (props) => {
  const { theme: { dark, colors }, toggleTheme } = useDarkThemeContext();
  const { signOut } = useAuthContext();

  return (
    <DrawerContentScrollView {...props}>
      <Drawer.Section>
        <DrawerItemList {...props} />
      </Drawer.Section>
      <Drawer.Section title="Preferences">
        <TouchableRipple onPress={toggleTheme}>
          <View style={styles.customDrawerItem}>
            <Text>Dark Mode</Text>
            <View pointerEvents="none">
              <Switch value={dark} color={colors.primary} />
            </View>
          </View>
        </TouchableRipple>
      </Drawer.Section>
      <DrawerItem
        icon={({ color, size }) => (
          <Icon name="exit-to-app" color={color} size={size} />
        )}
        label="Sign Out"
        onPress={signOut}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  customDrawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
});
