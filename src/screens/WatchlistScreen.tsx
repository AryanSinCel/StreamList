import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { WatchlistBecauseRow } from '../components/watchlist/WatchlistBecauseRow';
import { KickerTitleHeading } from '../components/common/KickerTitleHeading';
import { WatchlistEmptyState } from '../components/watchlist/WatchlistEmptyState';
import { WatchlistFilterChips } from '../components/watchlist/WatchlistFilterChips';
import { WatchlistGridCard } from '../components/watchlist/WatchlistGridCard';
import { WatchlistHeader } from '../components/watchlist/WatchlistHeader';
import { WatchlistPopularRecommendations } from '../components/watchlist/WatchlistPopularRecommendations';
import { WatchlistPopularSkeletons } from '../components/watchlist/WatchlistPopularSkeletons';
import { useWatchlistFeed } from '../hooks/useWatchlistFeed';
import type { WatchlistScreenProps } from '../navigation/types';
import { useWatchlistStore, type WatchlistItem } from '../store/watchlistStore';
import type { WatchlistGridDisplayItem } from '../types/watchlistGrid';
import type { WatchlistLandscapeItem } from '../types/watchlistLandscape';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { buildImageUrl } from '../utils/image';
import {
  extractYear,
  genreNamesFromIds,
  movieListItemToSearchGridItem,
  ratingLabelFromVote,
} from '../utils/movieDisplay';

const WATCHLIST_KICKER = 'YOUR COLLECTION';

type FilterMode = 'all' | 'movie' | 'tv';

function chunkPairs<T>(items: readonly T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2) as T[]);
  }
  return rows;
}

export function WatchlistScreen({ navigation }: WatchlistScreenProps) {
  const insets = useSafeAreaInsets();
  const hydrated = useWatchlistStore((s) => s.hydrated);
  const items = useWatchlistStore((s) => s.items);
  const removeItem = useWatchlistStore((s) => s.removeItem);

  const [filter, setFilter] = useState<FilterMode>('all');

  const mostRecentId =
    items.length > 0 ? items[items.length - 1]?.id ?? null : null;

  const { data: feed } = useWatchlistFeed(mostRecentId);

  const genreMap = useMemo(() => {
    const m = new Map<number, string>();
    for (const g of feed?.genres ?? []) {
      m.set(g.id, g.name);
    }
    return m;
  }, [feed?.genres]);

  const filtered = useMemo(() => {
    if (filter === 'all') {
      return items;
    }
    if (filter === 'movie') {
      return items.filter((i) => i.mediaType === 'movie');
    }
    return items.filter((i) => i.mediaType === 'tv');
  }, [items, filter]);

  const toGridItem = useCallback(
    (i: WatchlistItem): WatchlistGridDisplayItem => ({
      id: i.id,
      posterUri: buildImageUrl(i.posterPath, 'w342') ?? '',
      title: i.title,
      ratingLabel: ratingLabelFromVote(i.voteAverage),
      year: extractYear(i.releaseDate),
      genres: genreNamesFromIds(i.genreIds, genreMap),
    }),
    [genreMap],
  );

  const gridItems = useMemo(
    () => filtered.map(toGridItem),
    [filtered, toGridItem],
  );

  const gridRows = chunkPairs(gridItems);

  const popularEmptyGridItems = useMemo(() => {
    return (feed?.emptyTrending ?? [])
      .slice(0, 2)
      .map((m) => movieListItemToSearchGridItem(m, genreMap));
  }, [feed?.emptyTrending, genreMap]);

  const becauseItems: WatchlistLandscapeItem[] = useMemo(() => {
    return (feed?.becauseSimilar ?? []).slice(0, 8).map((m) => ({
      id: m.id,
      title: m.title || m.original_title,
      subtitle: `${extractYear(m.release_date)} • ${genreNamesFromIds(m.genre_ids, genreMap)}`,
      imageUri: buildImageUrl(m.backdrop_path, 'w780') ?? buildImageUrl(m.poster_path, 'w342') ?? '',
    }));
  }, [feed?.becauseSimilar, genreMap]);

  const openDetail = useCallback(
    (id: number) => {
      navigation.navigate('Detail', { id, mediaType: 'movie' });
    },
    [navigation],
  );

  const goSearchTab = () => {
    navigation.navigate('SearchTab', { screen: 'SearchMain' });
  };

  const goHomeTab = () => {
    navigation.navigate('HomeTab', { screen: 'HomeMain' });
  };

  const emptyByFilter =
    items.length > 0 &&
    filtered.length === 0 &&
    filter !== 'all';

  const showBecause =
    items.length > 0 &&
    becauseItems.length > 0 &&
    !feed?.becauseError;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.root}>
        <WatchlistHeader onSearchPress={goSearchTab} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: insets.bottom + spacing.watchlistScrollBottom,
            },
          ]}
        >
          <View style={styles.page}>
            <KickerTitleHeading
              kicker={WATCHLIST_KICKER}
              title="My Watchlist"
              footnote={
                hydrated ? `${items.length} titles` : undefined
              }
            />

            {!hydrated ? (
              <WatchlistPopularSkeletons />
            ) : items.length === 0 ? (
              <>
                <WatchlistEmptyState onBrowsePress={goHomeTab} />
                {feed?.emptyTrendingLoading ? (
                  <WatchlistPopularSkeletons />
                ) : feed?.emptyTrendingError ? (
                  <View style={styles.popularSectionError}>
                    <Text style={styles.popularSectionErrorText}>
                      {feed.emptyTrendingError}
                    </Text>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => feed.refetchEmptyTrending()}
                      style={styles.popularSectionRetry}
                    >
                      <Text style={styles.retryLabel}>Retry</Text>
                    </Pressable>
                  </View>
                ) : popularEmptyGridItems.length > 0 ? (
                  <WatchlistPopularRecommendations
                    items={popularEmptyGridItems}
                    onItemPress={openDetail}
                  />
                ) : (
                  <WatchlistPopularSkeletons />
                )}
              </>
            ) : (
              <>
                <WatchlistFilterChips
                  selectedIndex={
                    filter === 'all' ? 0 : filter === 'movie' ? 1 : 2
                  }
                  onSelectIndex={(i) =>
                    setFilter(i === 0 ? 'all' : i === 1 ? 'movie' : 'tv')
                  }
                />
                {emptyByFilter ? (
                  <View style={styles.filterEmpty}>
                    <Text style={styles.filterEmptyTitle}>
                      No{' '}
                      {filter === 'movie' ? 'Movies' : 'Series'} in your watchlist
                      yet
                    </Text>
                    <Pressable
                      accessibilityRole="button"
                      onPress={() => setFilter('all')}
                      style={styles.filterBrowse}
                    >
                      <Text style={styles.filterBrowseLabel}>Browse All</Text>
                    </Pressable>
                  </View>
                ) : (
                  <View style={styles.grid}>
                    {gridRows.map((rowItems, rowIndex) => (
                      <View
                        key={`row-${rowIndex}`}
                        style={[
                          styles.gridRow,
                          rowIndex < gridRows.length - 1 && styles.gridRowSpacing,
                        ]}
                      >
                        {rowItems.map((item) => (
                          <View
                            key={item.id}
                            style={[
                              styles.gridCell,
                              rowItems.length === 1 && styles.gridCellSingle,
                            ]}
                          >
                            <WatchlistGridCard
                              item={item}
                              onDetailsPress={() => openDetail(item.id)}
                              onRemovePress={() => removeItem(item.id)}
                            />
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                )}
                {showBecause && feed ? (
                  <WatchlistBecauseRow
                    title={`Because you saved ${items[items.length - 1]?.title ?? 'a title'}`}
                    items={becauseItems}
                    onViewAllPress={() =>
                      mostRecentId && openDetail(mostRecentId)
                    }
                    onItemPress={(index) => {
                      const m = becauseItems[index];
                      if (m) {
                        openDetail(m.id);
                      }
                    }}
                  />
                ) : null}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  page: {
    paddingHorizontal: spacing.watchlistPagePaddingHorizontal,
    paddingTop: spacing.xs,
  },
  grid: {
    marginBottom: spacing['5xl'],
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.watchlistGridGap,
  },
  gridRowSpacing: {
    marginBottom: spacing.watchlistGridGap,
  },
  gridCell: {
    flex: 1,
    minWidth: 0,
  },
  gridCellSingle: {
    maxWidth: '50%',
  },
  filterEmpty: {
    alignItems: 'center',
    paddingVertical: spacing['5xl'],
    gap: spacing.lg,
  },
  filterEmptyTitle: {
    ...typography['headline-md'],
    color: colors.on_surface,
    textAlign: 'center',
  },
  filterBrowse: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: spacing.md,
    backgroundColor: colors.surface_container_highest,
  },
  filterBrowseLabel: {
    ...typography['title-sm'],
    color: colors.primary_container,
    fontWeight: '600',
  },
  popularSectionError: {
    marginTop: spacing.screenBlockLarge,
    gap: spacing.sm,
  },
  popularSectionErrorText: {
    ...typography['body-md'],
    color: colors.on_surface_variant,
  },
  popularSectionRetry: {
    alignSelf: 'flex-start',
  },
  retryLabel: {
    ...typography['title-sm'],
    color: colors.primary_container,
  },
});
