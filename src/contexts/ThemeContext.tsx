import React, { FC, ReactChild, useContext } from 'react';
import { DefaultTheme } from 'utils/theme';
import type { Theme } from 'utils/theme';

type ThemeContextType = {
  toggleTheme:() => void;
  isDarkTheme: boolean,
  theme: Theme,
};

type ThemeContextProviderProps = {
  children: ReactChild,
  setIsDarkTheme:(arg:boolean) => void;
  isDarkTheme: boolean,
  theme: Theme,
};

export const ThemeContext = React.createContext<ThemeContextType>({
  toggleTheme: () => null,
  isDarkTheme: false,
  theme: DefaultTheme,
});

ThemeContext.displayName = 'ThemeContext';

export const ThemeContextProvider: FC<ThemeContextProviderProps> = ({
  children,
  isDarkTheme,
  setIsDarkTheme,
  theme,
}) => {
  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const values = {
    toggleTheme,
    isDarkTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={values}>
      {children}
    </ThemeContext.Provider>
  );
};

export const ThemeContextConsumer = ThemeContext.Consumer;

export const useThemeContext = () :ThemeContextType => useContext(ThemeContext);
