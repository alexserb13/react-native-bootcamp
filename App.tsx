import 'react-native-gesture-handler';
import React, { FC, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';

import { Navigation } from 'components';
import { AuthContextProvider, ThemeContextProvider } from 'contexts';

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
        <ThemeContextProvider {...darkThemeProps}>
          <PaperProvider theme={theme}>
            <NavigationContainer theme={theme}>
              <Navigation />
            </NavigationContainer>
          </PaperProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default App;
