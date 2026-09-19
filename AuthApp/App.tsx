import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import StackNavigator from './src/navigations/StackNavigator';
import { AppProvider } from './src/context/AppContext';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

function AppNavigation() {
  const { theme, colors } = useTheme();
  const navigationTheme = theme === 'dark'
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, background: colors.background, card: colors.tabBackground, text: colors.text, border: colors.border, primary: colors.primary } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, background: colors.background, card: colors.tabBackground, text: colors.text, border: colors.border, primary: colors.primary } };

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <StackNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <AppNavigation />
      </ThemeProvider>
    </AppProvider>
  );
}
