import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { navigationTheme } from './navigationTheme';
import { RootNavigator } from './RootNavigator';

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}
