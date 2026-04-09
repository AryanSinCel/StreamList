/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useWatchlistStore } from './src/store/watchlistStore';
import { colors } from './src/theme/colors';

function App() {
  const watchlistHydrated = useWatchlistStore((s) => s.hydrated);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.surface} />
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
