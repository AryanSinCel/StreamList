import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

export type RootStackParamList = {
  MainTabs: undefined;
  Detail: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ExploreTab: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function HomeScreen() {
  return (
    <LinearGradient
      colors={['#f0f0f0', '#d8d8d8']}
      style={styles.fillCenter}
    >
      <Text>Home</Text>
    </LinearGradient>
  );
}

function ExploreScreen() {
  return (
    <View style={styles.fillCenter}>
      <BlurView
        blurAmount={8}
        blurType="light"
        reducedTransparencyFallbackColor="#fff"
        style={StyleSheet.absoluteFill}
      />
      <Text style={styles.onBlur}>Explore</Text>
    </View>
  );
}

function DetailScreen() {
  return (
    <View style={styles.fillCenter}>
      <Text>Detail (stack)</Text>
    </View>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="ExploreTab"
        component={ExploreScreen}
        options={{ title: 'Explore' }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  fillCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onBlur: {
    zIndex: 1,
  },
});
