import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/** Shared detail route — TMDB id + media kind */
export type DetailParams = {
  id: number;
  mediaType: 'movie' | 'tv';
};

export type HomeStackParamList = {
  HomeMain: undefined;
  Detail: DetailParams;
};

export type SearchStackParamList = {
  SearchMain: undefined;
  Detail: DetailParams;
};

export type WatchlistStackParamList = {
  WatchlistMain: undefined;
  Detail: DetailParams;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  Detail: DetailParams;
};

/**
 * Root navigator: bottom tabs, each tab hosts its own stack (spec §3 / §5).
 */
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SearchTab: NavigatorScreenParams<SearchStackParamList>;
  WatchlistTab: NavigatorScreenParams<WatchlistStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

export type HomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'HomeMain'>,
  BottomTabScreenProps<MainTabParamList, 'HomeTab'>
>;

export type SearchScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, 'SearchMain'>,
  BottomTabScreenProps<MainTabParamList, 'SearchTab'>
>;

export type WatchlistScreenProps = CompositeScreenProps<
  NativeStackScreenProps<WatchlistStackParamList, 'WatchlistMain'>,
  BottomTabScreenProps<MainTabParamList, 'WatchlistTab'>
>;

export type ProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>,
  BottomTabScreenProps<MainTabParamList, 'ProfileTab'>
>;

/** Detail appears on every tab stack with the same params */
export type DetailScreenProps = NativeStackScreenProps<
  { Detail: DetailParams },
  'Detail'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainTabParamList {}
  }
}
