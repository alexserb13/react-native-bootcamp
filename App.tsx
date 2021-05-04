import 'react-native-gesture-handler';
import React, { FC, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

import { Navigation } from 'components/Navigation/Navigation';
import { AuthContextProvider } from 'context/AuthContext';
import { DarkThemeContextProvider } from 'context/DarkThemeContext';

import { DefaultTheme, DarkTheme } from 'utils/theme';

LogBox.ignoreLogs(['Setting a timer']);

const queryClient = new QueryClient();

const App: FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const theme = isDarkTheme ? DarkTheme : DefaultTheme;
  const darkThemeProps = {
    isDarkTheme,
    setIsDarkTheme,
    theme,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <DarkThemeContextProvider {...darkThemeProps}>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              <Navigation />
            </NavigationContainer>
          </PaperProvider>
        </DarkThemeContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
