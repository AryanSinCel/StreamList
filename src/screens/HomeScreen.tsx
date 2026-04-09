import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContentRow } from '../components/home/ContentRow';
import { GenreChipStrip } from '../components/home/GenreChipStrip';
import { HomeHeader } from '../components/home/HomeHeader';
import { HomeHeroCard } from '../components/home/HomeHeroCard';
import { HomeHeroSkeleton } from '../components/home/HomeHeroSkeleton';
import { HomeLoadingFooter } from '../components/home/HomeLoadingFooter';
import { LazyGenreRail } from '../components/home/LazyGenreRail';
import { useHome } from '../hooks/useHome';
import type { HomeScreenProps, SeeAllParams } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { buildImageUrl } from '../utils/image';
import { movieListItemToPosterItem } from '../utils/movieDisplay';

const SCROLL_THROTTLE_MS = 72;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [chipIndex, setChipIndex] = useState(0);
  const { data, error, refetch } = useHome(chipIndex);
  const { height: viewportHeight } = useWindowDimensions();
  const [scrollY, setScrollY] = useState(0);
  const lastScrollTs = useRef(0);

  const genreMap = useMemo(() => {
    const m = new Map<number, string>();
    for (const g of data.genres) {
      m.set(g.id, g.name);
    }
    return m;
  }, [data.genres]);

  const chipLabels = useMemo(
    () => ['All', ...data.genres.map((g) => g.name)],
    [data.genres],
  );

  const selectedGenreId =
    chipIndex === 0 ? null : data.genres[chipIndex - 1]?.id ?? null;

  const openDetail = useCallback(
    (movieId: number) => {
      navigation.navigate('Detail', { id: movieId, mediaType: 'movie' });
    },
    [navigation],
  );

  const openSeeAll = useCallback(
    (params: SeeAllParams) => {
      navigation.navigate('SeeAll', params);
    },
    [navigation],
  );

  const trendingPosters = useMemo(
    () =>
      data.trending.items.map((m) =>
        movieListItemToPosterItem(m, genreMap),
      ),
    [data.trending.items, genreMap],
  );

  const topRatedPosters = useMemo(
    () =>
      data.topRated.items.map((m) =>
        movieListItemToPosterItem(m, genreMap),
      ),
    [data.topRated.items, genreMap],
  );

  const singleFilterGenrePosters = useMemo(() => {
    if (selectedGenreId == null) {
      return [];
    }
    return (data.genreRows[selectedGenreId]?.items ?? []).map((m) =>
      movieListItemToPosterItem(m, genreMap),
    );
  }, [data.genreRows, selectedGenreId, genreMap]);

  const hero = data.heroMovie;
  const heroBackdrop = hero
    ? buildImageUrl(hero.backdrop_path, 'w780')
    : null;
  const heroLoading = Boolean(data.trending.loading && !hero);

  const genreTitle =
    chipIndex === 0 ? '' : chipLabels[chipIndex] ?? 'Genre';

  const showSingleGenreRow = chipIndex > 0 && selectedGenreId != null;

  const allModeAnyGenreLoadingMore =
    chipIndex === 0 &&
    Object.values(data.genreRows).some((r) => r.loadingMore);

  const loadingMoreFooter =
    Boolean(data.trending.loadingMore) ||
    Boolean(data.topRated.loadingMore) ||
    (selectedGenreId != null &&
      Boolean(data.genreRows[selectedGenreId]?.loadingMore)) ||
    allModeAnyGenreLoadingMore;

  const onHomeScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const now = Date.now();
      if (now - lastScrollTs.current < SCROLL_THROTTLE_MS) {
        return;
      }
      lastScrollTs.current = now;
      setScrollY(e.nativeEvent.contentOffset.y);
    },
    [],
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.root}>
        <HomeHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          onScroll={onHomeScroll}
          scrollEventThrottle={SCROLL_THROTTLE_MS}
        >
          {error ? (
            <View style={styles.banner}>
              <Text style={styles.bannerText}>{error}</Text>
              <Pressable onPress={refetch} accessibilityRole="button">
                <Text style={styles.retry}>Retry</Text>
              </Pressable>
            </View>
          ) : null}

          <GenreChipStrip
            labels={chipLabels}
            selectedIndex={Math.min(chipIndex, Math.max(0, chipLabels.length - 1))}
            onSelectIndex={setChipIndex}
          />

          {heroLoading ? (
            <HomeHeroSkeleton />
          ) : (
            <HomeHeroCard
              backdropUri={heroBackdrop}
              title={hero?.title ?? hero?.original_title ?? ''}
              overview={hero?.overview ?? ''}
              onPressWatch={() => hero && openDetail(hero.id)}
              onPressDetails={() => hero && openDetail(hero.id)}
            />
          )}

          {data.trending.error ? (
            <View style={styles.rowErr}>
              <Text style={styles.errText}>{data.trending.error}</Text>
              <Pressable onPress={data.retryTrending} accessibilityRole="button">
                <Text style={styles.retry}>Retry</Text>
              </Pressable>
            </View>
          ) : null}
          <ContentRow
            title="Trending Now"
            items={trendingPosters}
            loading={
              data.trending.loading && trendingPosters.length === 0
            }
            onSeeAllPress={() =>
              openSeeAll({ type: 'trending', title: 'Trending Now' })
            }
            onItemPress={(item) => openDetail(item.numericId)}
            onNearEnd={data.loadMoreTrending}
          />

          {data.topRated.error ? (
            <View style={styles.rowErr}>
              <Text style={styles.errText}>{data.topRated.error}</Text>
              <Pressable onPress={data.retryTopRated} accessibilityRole="button">
                <Text style={styles.retry}>Retry</Text>
              </Pressable>
            </View>
          ) : null}
          <ContentRow
            title="Top Rated"
            items={topRatedPosters}
            loading={
              data.topRated.loading && topRatedPosters.length === 0
            }
            onSeeAllPress={() =>
              openSeeAll({ type: 'top_rated', title: 'Top Rated' })
            }
            onItemPress={(item) => openDetail(item.numericId)}
            onNearEnd={data.loadMoreTopRated}
          />

          {chipIndex === 0
            ? data.genres.map((g) => (
                <LazyGenreRail
                  key={g.id}
                  title={g.name}
                  scrollY={scrollY}
                  viewportHeight={viewportHeight}
                  genreMap={genreMap}
                  rowState={data.genreRows[g.id]}
                  onRequestLoad={() => data.ensureGenreRowLoaded(g.id)}
                  onLoadMore={() => data.loadMoreGenre(g.id)}
                  onRetry={() => data.retryGenre(g.id)}
                  onItemPress={openDetail}
                  onSeeAllPress={() =>
                    openSeeAll({ type: 'genre', genreId: g.id, title: g.name })
                  }
                />
              ))
            : null}

          {showSingleGenreRow && selectedGenreId != null ? (
            <>
              {data.genreRows[selectedGenreId]?.error ? (
                <View style={styles.rowErr}>
                  <Text style={styles.errText}>
                    {data.genreRows[selectedGenreId]?.error}
                  </Text>
                  <Pressable
                    onPress={() => data.retryGenre(selectedGenreId)}
                    accessibilityRole="button"
                  >
                    <Text style={styles.retry}>Retry</Text>
                  </Pressable>
                </View>
              ) : null}
              <ContentRow
                title={genreTitle || 'Genre'}
                items={singleFilterGenrePosters}
                loading={Boolean(
                  data.genreRows[selectedGenreId]?.loading &&
                    singleFilterGenrePosters.length === 0,
                )}
                marginBottom={spacing.screenBlockLarge}
                onSeeAllPress={() => {
                  if (selectedGenreId == null) {
                    return;
                  }
                  openSeeAll({
                    type: 'genre',
                    genreId: selectedGenreId,
                    title: genreTitle || 'Genre',
                  });
                }}
                onItemPress={(item) => openDetail(item.numericId)}
                onNearEnd={() => data.loadMoreGenre(selectedGenreId)}
              />
            </>
          ) : null}

          <HomeLoadingFooter visible={loadingMoreFooter} />
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
    paddingBottom: spacing['9xl'],
  },
  banner: {
    paddingHorizontal: spacing['3xl'],
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
  rowErr: {
    paddingHorizontal: spacing['3xl'],
    marginBottom: spacing.sm,
  },
  errText: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
  },
});
