import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContentRow } from '../components/home/ContentRow';
import { GenreChipStrip } from '../components/home/GenreChipStrip';
import { HomeHeader } from '../components/home/HomeHeader';
import { HomeHeroCard } from '../components/home/HomeHeroCard';
import { HomeLoadingFooter } from '../components/home/HomeLoadingFooter';
import { useHome } from '../hooks/useHome';
import type { HomeScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { buildImageUrl } from '../utils/image';
import { movieListItemToPosterItem } from '../utils/movieDisplay';

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [chipIndex, setChipIndex] = useState(0);
  const { data, error, refetch } = useHome(chipIndex);

  const genreMap = useMemo(() => {
    const m = new Map<number, string>();
    for (const g of data?.genres ?? []) {
      m.set(g.id, g.name);
    }
    return m;
  }, [data?.genres]);

  const chipLabels = useMemo(
    () => ['All', ...(data?.genres ?? []).map((g) => g.name)],
    [data?.genres],
  );

  const openDetail = useCallback(
    (movieId: number) => {
      navigation.navigate('Detail', { id: movieId, mediaType: 'movie' });
    },
    [navigation],
  );

  const trendingPosters = useMemo(
    () =>
      (data?.trending.items ?? []).map((m) =>
        movieListItemToPosterItem(m, genreMap),
      ),
    [data?.trending.items, genreMap],
  );

  const topRatedPosters = useMemo(
    () =>
      (data?.topRated.items ?? []).map((m) =>
        movieListItemToPosterItem(m, genreMap),
      ),
    [data?.topRated.items, genreMap],
  );

  const genrePosters = useMemo(() => {
    const items = data?.genreRow?.items ?? [];
    return items.map((m) => movieListItemToPosterItem(m, genreMap));
  }, [data?.genreRow?.items, genreMap]);

  const hero = data?.heroMovie;
  const heroBackdrop = hero
    ? buildImageUrl(hero.backdrop_path, 'w780')
    : null;
  const heroLoading = Boolean(data?.trending.loading && !hero);

  const genreTitle =
    chipIndex === 0
      ? ''
      : chipLabels[chipIndex] ?? 'Genre';

  const showGenreRow = chipIndex > 0 && data != null;

  const loadingMoreFooter =
    Boolean(data?.trending.loadingMore) ||
    Boolean(data?.topRated.loadingMore) ||
    Boolean(data?.genreRow?.loadingMore);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.root}>
        <HomeHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
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

          <HomeHeroCard
            backdropUri={heroBackdrop}
            title={hero?.title ?? hero?.original_title ?? ''}
            overview={hero?.overview ?? ''}
            loading={heroLoading}
            onPressWatch={() => hero && openDetail(hero.id)}
            onPressDetails={() => hero && openDetail(hero.id)}
          />

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
            onSeeAllPress={() =>
              trendingPosters[0] && openDetail(trendingPosters[0].numericId)
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
            onSeeAllPress={() =>
              topRatedPosters[0] && openDetail(topRatedPosters[0].numericId)
            }
            onItemPress={(item) => openDetail(item.numericId)}
            onNearEnd={data.loadMoreTopRated}
          />

          {showGenreRow ? (
            <>
              {data.genreRow?.error ? (
                <View style={styles.rowErr}>
                  <Text style={styles.errText}>{data.genreRow.error}</Text>
                  <Pressable
                    onPress={data.retryGenre}
                    accessibilityRole="button"
                  >
                    <Text style={styles.retry}>Retry</Text>
                  </Pressable>
                </View>
              ) : null}
              <ContentRow
                title={genreTitle || 'Genre'}
                items={genrePosters}
                marginBottom={spacing.screenBlockLarge}
                onSeeAllPress={() =>
                  genrePosters[0] && openDetail(genrePosters[0].numericId)
                }
                onItemPress={(item) => openDetail(item.numericId)}
                onNearEnd={data.loadMoreGenre}
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
