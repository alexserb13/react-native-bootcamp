import React, { FC, ReactChild, useContext } from 'react';

type DarkThemeContextType = {
  toggleTheme:() => void;
  isDarkTheme: boolean,
  theme: any,
};

type DarkThemeContextProviderProps = {
  children: ReactChild,
  setIsDarkTheme:(arg:boolean) => void;
  isDarkTheme: boolean,
  theme: any,
};

export const DarkThemeContext = React.createContext<DarkThemeContextType>({
  toggleTheme: () => null,
  isDarkTheme: false,
  theme: {},
});

DarkThemeContext.displayName = 'DarkThemeContext';

export const DarkThemeContextProvider: FC<DarkThemeContextProviderProps> = ({
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
    <DarkThemeContext.Provider value={values}>
      {children}
    </DarkThemeContext.Provider>
  );
};

export const DarkThemeContextConsumer = DarkThemeContext.Consumer;

export const useDarkThemeContext = () :DarkThemeContextType => useContext(DarkThemeContext);
