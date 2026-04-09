import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

/** Shared detail route — TMDB id + media kind */
export type DetailParams = {
  id: number;
  mediaType: 'movie' | 'tv';
};

export type SeeAllParams = {
  type: 'trending' | 'top_rated' | 'genre' | 'similar';
  genreId?: number;
  /** Source movie id when `type` is `similar` (TMDB /movie/{id}/similar). */
  movieId?: number;
  title: string;
};

/** Per-tab stacks — only tab roots; Detail / See All live on `RootStackParamList`. */
export type HomeStackParamList = {
  HomeMain: undefined;
};

export type SearchStackParamList = {
  SearchMain: undefined;
};

export type WatchlistStackParamList = {
  WatchlistMain: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
};

/**
 * Bottom tabs; each tab hosts a single-screen stack (spec §3 / §5).
 * Modal flows use the root stack (`Detail`, `SeeAll`).
 */
export type MainTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  SearchTab: NavigatorScreenParams<SearchStackParamList>;
  WatchlistTab: NavigatorScreenParams<WatchlistStackParamList>;
  ProfileTab: NavigatorScreenParams<ProfileStackParamList>;
};

/**
 * Root native stack: tabs + shared screens. Keeps tab bar off Detail / See All.
 */
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  Detail: DetailParams;
  SeeAll: SeeAllParams;
};

export type HomeScreenProps = CompositeScreenProps<
  NativeStackScreenProps<HomeStackParamList, 'HomeMain'>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'HomeTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type SeeAllScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SeeAll'
>;

export type SearchScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SearchStackParamList, 'SearchMain'>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'SearchTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type WatchlistScreenProps = CompositeScreenProps<
  NativeStackScreenProps<WatchlistStackParamList, 'WatchlistMain'>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'WatchlistTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export type ProfileScreenProps = CompositeScreenProps<
  NativeStackScreenProps<ProfileStackParamList, 'ProfileMain'>,
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, 'ProfileTab'>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

/** Detail on root stack */
export type DetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Detail'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
