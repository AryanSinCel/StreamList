import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  BookmarkIcon,
  HomeIcon,
  PersonIcon,
  SearchIcon,
} from '../components/icons/svgIcons';
import { DetailScreen } from '../screens/DetailScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { WatchlistScreen } from '../screens/WatchlistScreen';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import type {
  HomeStackParamList,
  MainTabParamList,
  ProfileStackParamList,
  SearchStackParamList,
  WatchlistStackParamList,
} from './types';

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const SearchStack = createNativeStackNavigator<SearchStackParamList>();
const WatchlistStack = createNativeStackNavigator<WatchlistStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const Tab = createBottomTabNavigator<MainTabParamList>();

const stackScreenOptions = {
  headerShown: false,
} as const;

/** Detail uses in-screen hero + `DetailTopBar` (project-spec §7.3 / resources/movie-showDetail.html). */
const detailScreenOptions = {
  headerShown: false,
} as const;

/** Tab bar fill — `surface` (#131313), project-spec §7.5 / §6.4 chrome. */
function TabBarBackground() {
  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: colors.surface }]}
    />
  );
}

function HomeTabIcon({ color, size }: { color: string; size: number }) {
  return <HomeIcon color={color} size={size} />;
}

function SearchTabIcon({ color, size }: { color: string; size: number }) {
  return <SearchIcon color={color} size={size} />;
}

function WatchlistTabIcon({ color, size }: { color: string; size: number }) {
  return <BookmarkIcon color={color} size={size} />;
}

function ProfileTabIcon({ color, size }: { color: string; size: number }) {
  return <PersonIcon color={color} size={size} />;
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={stackScreenOptions}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} />
      <HomeStack.Screen
        name="Detail"
        component={DetailScreen}
        options={detailScreenOptions}
      />
    </HomeStack.Navigator>
  );
}

function SearchStackNavigator() {
  return (
    <SearchStack.Navigator screenOptions={stackScreenOptions}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} />
      <SearchStack.Screen
        name="Detail"
        component={DetailScreen}
        options={detailScreenOptions}
      />
    </SearchStack.Navigator>
  );
}

function WatchlistStackNavigator() {
  return (
    <WatchlistStack.Navigator screenOptions={stackScreenOptions}>
      <WatchlistStack.Screen name="WatchlistMain" component={WatchlistScreen} />
      <WatchlistStack.Screen
        name="Detail"
        component={DetailScreen}
        options={detailScreenOptions}
      />
    </WatchlistStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={stackScreenOptions}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen
        name="Detail"
        component={DetailScreen}
        options={detailScreenOptions}
      />
    </ProfileStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xl,
  },
  tabLabel: {
    textTransform: 'uppercase',
    marginTop: 0,
  },
});

const tabNavigatorScreenOptions = {
  headerShown: false,
  tabBarShowLabel: true,
  tabBarActiveTintColor: colors.primary_container,
  tabBarInactiveTintColor: colors.on_surface_variant,
  tabBarLabelStyle: [typography['label-sm'], styles.tabLabel],
  tabBarStyle: styles.tabBar,
  tabBarBackground: TabBarBackground,
};

export function RootNavigator() {
  return (
    <Tab.Navigator screenOptions={tabNavigatorScreenOptions}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ tabBarLabel: 'HOME', tabBarIcon: HomeTabIcon }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackNavigator}
        options={{ tabBarLabel: 'SEARCH', tabBarIcon: SearchTabIcon }}
      />
      <Tab.Screen
        name="WatchlistTab"
        component={WatchlistStackNavigator}
        options={{ tabBarLabel: 'WATCHLIST', tabBarIcon: WatchlistTabIcon }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{ tabBarLabel: 'PROFILE', tabBarIcon: ProfileTabIcon }}
      />
    </Tab.Navigator>
  );
}
