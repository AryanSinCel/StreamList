/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useWatchlistStore } from './src/store/watchlistStore';
import { colors } from './src/theme/colors';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const watchlistHydrated = useWatchlistStore((s) => s.hydrated);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {watchlistHydrated ? (
        <AppNavigator />
      ) : (
        <View style={styles.hydrationPlaceholder} />
      )}
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create({
  hydrationPlaceholder: {
    flex: 1,
    backgroundColor: colors.surface,
  },
});
