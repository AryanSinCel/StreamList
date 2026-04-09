import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { RootNavigator } from './RootNavigator';

export function AppNavigator() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
