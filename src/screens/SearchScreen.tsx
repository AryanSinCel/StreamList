import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { RecentSearchesBlock } from '../components/search/RecentSearchesBlock';
import { SearchGenreChips } from '../components/search/SearchGenreChips';
import { SearchGridPosterCard } from '../components/search/SearchGridPosterCard';
import { SearchHeader } from '../components/search/SearchHeader';
import { SearchTextField } from '../components/search/SearchTextField';
import { SearchTrendingSection } from '../components/search/SearchTrendingSection';
import { useSearch } from '../hooks/useSearch';
import type { SearchScreenProps } from '../navigation/types';
import type { SearchGridItem } from '../types/searchGrid';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { buildImageUrl } from '../utils/image';
import {
  extractYear,
  genreNamesFromIds,
  ratingLabelFromVote,
} from '../utils/movieDisplay';

export function SearchScreen({ navigation }: SearchScreenProps) {
  const insets = useSafeAreaInsets();
  const [rawQuery, setRawQuery] = useState('');
  const [searchGenreIndex, setSearchGenreIndex] = useState(0);
  const { data, loading, error, refetch } = useSearch(rawQuery);

  const debouncedActive = data != null && data.query.length > 0;

  const genreMap = useMemo(() => {
    const m = new Map<number, string>();
    for (const g of data?.genres ?? []) {
      m.set(g.id, g.name);
    }
    return m;
  }, [data?.genres]);

  const openDetail = useCallback(
    (movieId: number) => {
      navigation.navigate('Detail', { id: movieId, mediaType: 'movie' });
    },
    [navigation],
  );

  const searchGenreLabels = useMemo(
    () => ['Action', 'Comedy', 'Sci-Fi', 'Drama', 'Horror', 'Documentary'],
    [],
  );

  const applyGenreChip = useCallback(
    (index: number) => {
      setSearchGenreIndex(index);
      const label = searchGenreLabels[index];
      if (label) {
        setRawQuery(label);
      }
    },
    [searchGenreLabels],
  );

  const featured = data?.defaultTrending[0];
  const gridSource = (data?.defaultTrending ?? []).slice(1, 4);

  const featuredMeta = useMemo(() => {
    if (!featured) {
      return '';
    }
    const g = genreNamesFromIds(featured.genre_ids, genreMap);
    const y = extractYear(featured.release_date);
    return [g, y].filter((p) => p !== '—').join(' • ');
  }, [featured, genreMap]);

  const gridItems: SearchGridItem[] = useMemo(() => {
    return gridSource.map((m) => ({
      id: m.id,
      posterUri: buildImageUrl(m.poster_path, 'w342') ?? '',
      title: m.title || m.original_title,
      genre: genreNamesFromIds(m.genre_ids, genreMap),
      ratingLabel: ratingLabelFromVote(m.vote_average),
    }));
  }, [gridSource, genreMap]);

  const resultItems: SearchGridItem[] = useMemo(() => {
    if (!data || !debouncedActive) {
      return [];
    }
    return data.results.map((m) => ({
      id: m.id,
      posterUri: buildImageUrl(m.poster_path, 'w342') ?? '',
      title: m.title || m.original_title,
      genre: genreNamesFromIds(m.genre_ids, genreMap),
      ratingLabel: ratingLabelFromVote(m.vote_average),
    }));
  }, [data, debouncedActive, genreMap]);

  const handleScroll = useCallback(
    (e: {
      nativeEvent: {
        contentOffset: { y: number };
        layoutMeasurement: { height: number };
        contentSize: { height: number };
      };
    }) => {
      const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
      const pad = spacing['5xl'];
      if (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - pad
      ) {
        data?.fetchNextPage().catch(() => {});
      }
    },
    [data],
  );

  const showRecent = rawQuery.trim().length === 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.root}>
        <SearchHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: insets.bottom + spacing.searchScrollBottom,
            },
          ]}
          onScroll={handleScroll}
          scrollEventThrottle={400}
        >
          <View style={styles.page}>
            <SearchTextField value={rawQuery} onChangeText={setRawQuery} />

            {debouncedActive ? (
              <>
                {error ? (
                  <View style={styles.banner}>
                    <Text style={styles.bannerText}>{error}</Text>
                    <Pressable onPress={refetch} accessibilityRole="button">
                      <Text style={styles.retry}>Retry</Text>
                    </Pressable>
                  </View>
                ) : null}
                <Text style={styles.resultCount}>
                  {loading
                    ? 'Searching…'
                    : `${data?.totalResults ?? 0} results for '${data?.query ?? ''}'`}
                </Text>
                {loading && (data?.results.length ?? 0) === 0 ? (
                  <ActivityIndicator
                    color={colors.primary_container}
                    style={styles.loader}
                  />
                ) : null}
                {!loading && (data?.totalResults ?? 0) === 0 ? (
                  <View style={styles.zero}>
                    <Text style={styles.zeroTitle}>
                      No results for '{data?.query ?? ''}'
                    </Text>
                    <Text style={styles.zeroBody}>
                      Try another title or check spelling.
                    </Text>
                  </View>
                ) : (
                  <View style={styles.resultGrid}>
                    {chunkPairs(resultItems).map((row, ri) => (
                      <View key={`sr-${ri}`} style={styles.gridRow}>
                        {row.map((item) => (
                          <View key={item.id} style={styles.gridCell}>
                            <SearchGridPosterCard
                              item={item}
                              onPress={() => openDetail(item.id)}
                            />
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                )}
              </>
            ) : (
              <>
                <SearchGenreChips
                  labels={searchGenreLabels}
                  selectedIndex={searchGenreIndex}
                  onSelectIndex={applyGenreChip}
                />
                {showRecent && data ? (
                  <RecentSearchesBlock
                    terms={data.recentSearches}
                    onClearAllPress={() => {
                      data.clearAllRecentSearches().catch(() => {});
                    }}
                    onRowPress={(term) => setRawQuery(term)}
                    onDismissPress={(term) => {
                      data.removeRecentSearchTerm(term).catch(() => {});
                    }}
                  />
                ) : null}
                {data ? (
                  <SearchTrendingSection
                    featuredBackdropUri={
                      featured
                        ? buildImageUrl(featured.backdrop_path, 'w780')
                        : null
                    }
                    featuredTitle={
                      featured?.title ?? featured?.original_title ?? ''
                    }
                    featuredMeta={featuredMeta}
                    gridItems={gridItems}
                    loading={data.defaultTrendingLoading}
                    onFeaturedPress={() =>
                      featured && openDetail(featured.id)
                    }
                    onPosterPress={(item) => openDetail(item.id)}
                  />
                ) : null}
                {data?.defaultTrendingError ? (
                  <Text style={styles.bannerText}>{data.defaultTrendingError}</Text>
                ) : null}
              </>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function chunkPairs<T>(items: readonly T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2) as T[]);
  }
  return rows;
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
    paddingHorizontal: spacing.searchPagePaddingHorizontal,
    paddingTop: spacing.xs,
  },
  banner: {
    marginBottom: spacing.md,
  },
  bannerText: {
    ...typography['body-md'],
    color: colors.on_surface_variant,
  },
  retry: {
    ...typography['title-sm'],
    color: colors.primary_container,
    marginTop: spacing.sm,
  },
  resultCount: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
    marginBottom: spacing.lg,
  },
  loader: {
    marginVertical: spacing.xl,
  },
  zero: {
    alignItems: 'center',
    paddingVertical: spacing['5xl'],
  },
  zeroTitle: {
    ...typography['headline-md'],
    color: colors.on_surface,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  zeroBody: {
    ...typography['body-md'],
    color: colors.on_surface_variant,
    textAlign: 'center',
  },
  resultGrid: {
    gap: spacing.searchGridGap,
  },
  gridRow: {
    flexDirection: 'row',
    gap: spacing.searchGridGap,
  },
  gridCell: {
    flex: 1,
    minWidth: 0,
  },
});
