import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  DarkTheme as PaperDarkTheme,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import type { Theme as NavigationTheme } from '@react-navigation/native';

export type Theme = NavigationTheme & { colors: { pending: string } };

export const DefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#009387',
    pending: '#FF6D00',
  },
};
export const DarkTheme = {
  ...PaperDarkTheme,
  ...NavigationDarkTheme,
  mode: 'adaptive',
  colors: {
    ...PaperDarkTheme.colors,
    ...NavigationDarkTheme.colors,
    primary: '#009387',
    pending: '#FF6D00',
  },
};
