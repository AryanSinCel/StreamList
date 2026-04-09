import React, { useCallback, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  useNavigation,
  useRoute,
  type NavigationProp,
  type ParamListBase,
} from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SectionHeaderRow } from '../components/common/SectionHeaderRow';
import { DetailCastRow } from '../components/detail/DetailCastRow';
import { DetailHeroBackdrop } from '../components/detail/DetailHeroBackdrop';
import { DetailMetadataRow } from '../components/detail/DetailMetadataRow';
import { DetailMoreLikeRow } from '../components/detail/DetailMoreLikeRow';
import { DetailSynopsisSection } from '../components/detail/DetailSynopsisSection';
import { DetailTopBar } from '../components/detail/DetailTopBar';
import { DetailWatchlistActions } from '../components/detail/DetailWatchlistActions';
import { useMovieDetail } from '../hooks/useMovieDetail';
import type { DetailParams } from '../navigation/types';
import { useWatchlistStore, type WatchlistItem } from '../store/watchlistStore';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { buildImageUrl } from '../utils/image';
import {
  extractYear,
  formatGenreLineFromDetails,
  formatRuntimeMinutes,
  ratingLabelFromVote,
} from '../utils/movieDisplay';

type DetailRouteProp = RouteProp<{ Detail: DetailParams }, 'Detail'>;

export function DetailScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const route = useRoute<DetailRouteProp>();
  const movieId = route.params.id;

  const { data, error, refetch } = useMovieDetail(movieId);
  const hydrated = useWatchlistStore((s) => s.hydrated);
  const isInWatchlist = useWatchlistStore((s) => s.isInWatchlist(movieId));
  const addItem = useWatchlistStore((s) => s.addItem);
  const removeItem = useWatchlistStore((s) => s.removeItem);

  const [expanded, setExpanded] = useState(false);

  const movie = data?.movie;

  const backdropUri = movie
    ? buildImageUrl(movie.backdrop_path, 'w780')
    : null;

  const year = movie ? extractYear(movie.release_date) : '';
  const ratingLabel = useMemo(() => {
    if (!movie || movie.vote_average <= 0) {
      return null;
    }
    const r = ratingLabelFromVote(movie.vote_average);
    return r ? `${movie.vote_average.toFixed(1)} Rating` : null;
  }, [movie]);

  const genreLine = movie ? formatGenreLineFromDetails(movie) : null;
  const runtimeLabel = movie
    ? formatRuntimeMinutes(movie.runtime)
    : null;

  const castMembers = useMemo(() => {
    const raw = data?.credits?.cast ?? [];
    return raw
      .slice()
      .sort((a, b) => a.order - b.order)
      .slice(0, 12)
      .map((c) => ({
        name: c.name,
        character: c.character,
        photoUri: buildImageUrl(c.profile_path, 'w185'),
      }));
  }, [data?.credits?.cast]);

  const similarItems = useMemo(() => {
    return (data?.similar ?? []).map((m) => ({
      id: m.id,
      title: m.title || m.original_title,
      posterUri: buildImageUrl(m.poster_path, 'w342'),
    }));
  }, [data?.similar]);

  const toggleWatchlist = useCallback(() => {
    if (!movie) {
      return;
    }
    const item: WatchlistItem = {
      id: movie.id,
      title: movie.title || movie.original_title,
      posterPath: movie.poster_path,
      voteAverage: movie.vote_average,
      releaseDate: movie.release_date,
      genreIds: movie.genres.map((g) => g.id),
      mediaType: 'movie',
    };
    if (isInWatchlist) {
      removeItem(movie.id);
    } else {
      addItem(item);
    }
  }, [movie, isInWatchlist, addItem, removeItem]);

  const openSimilar = useCallback(
    (id: number) => {
      navigation.navigate('Detail', { id, mediaType: 'movie' });
    },
    [navigation],
  );

  const similarHidden =
    !data?.loading.similar &&
    !data?.sectionErrors.similar &&
    similarItems.length === 0;

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + spacing['5xl'] },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {error && !movie ? (
          <View style={styles.banner}>
            <Text style={styles.bannerText}>{error}</Text>
            <Pressable onPress={refetch} accessibilityRole="button">
              <Text style={styles.retry}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        <DetailHeroBackdrop imageUri={backdropUri}>
          <DetailTopBar
            onBackPress={() => navigation.goBack()}
            onSharePress={() => undefined}
          />
        </DetailHeroBackdrop>

        <View style={styles.body}>
          {data?.loading.movie && !movie ? (
            <Text style={styles.displayTitle}> </Text>
          ) : (
            <Text style={styles.displayTitle} numberOfLines={3}>
              {(movie?.title ?? movie?.original_title ?? '').toUpperCase()}
            </Text>
          )}

          <View style={styles.meta}>
            {data?.sectionErrors.movie ? (
              <View style={styles.rowErr}>
                <Text style={styles.errText}>{data.sectionErrors.movie}</Text>
                <Pressable onPress={data.retryMovie} accessibilityRole="button">
                  <Text style={styles.retry}>Retry</Text>
                </Pressable>
              </View>
            ) : (
              <DetailMetadataRow
                year={year || null}
                ratingLabel={ratingLabel}
                genre={genreLine && genreLine !== '—' ? genreLine : null}
                runtime={runtimeLabel}
              />
            )}
          </View>

          <DetailWatchlistActions
            hydrated={hydrated}
            isInWatchlist={isInWatchlist}
            onAddPress={toggleWatchlist}
            onInWatchlistPress={toggleWatchlist}
          />

          {movie ? (
            <DetailSynopsisSection
              body={movie.overview || 'No overview available.'}
              expanded={expanded}
              onReadMorePress={() => setExpanded((v) => !v)}
            />
          ) : null}

          {data?.sectionErrors.credits ? (
            <>
              <Text style={styles.castHeading}>Cast</Text>
              <View style={styles.rowErr}>
                <Text style={styles.errText}>{data.sectionErrors.credits}</Text>
                <Pressable onPress={data.retryCredits} accessibilityRole="button">
                  <Text style={styles.retry}>Retry</Text>
                </Pressable>
              </View>
            </>
          ) : data?.loading.credits ? (
            <>
              <Text style={styles.castHeading}>Cast</Text>
              <DetailCastRow members={[]} showSkeletonSlot />
            </>
          ) : castMembers.length === 0 ? (
            <Text style={styles.fallback}>Cast information unavailable</Text>
          ) : (
            <>
              <Text style={styles.castHeading}>Cast</Text>
              <DetailCastRow members={castMembers} showSkeletonSlot={false} />
            </>
          )}

          {!similarHidden ? (
            <>
              <SectionHeaderRow title="More Like This" actionLabel="See All" />
              {data?.sectionErrors.similar ? (
                <View style={styles.rowErr}>
                  <Text style={styles.errText}>{data.sectionErrors.similar}</Text>
                  <Pressable
                    onPress={data.retrySimilar}
                    accessibilityRole="button"
                  >
                    <Text style={styles.retry}>Retry</Text>
                  </Pressable>
                </View>
              ) : data?.loading.similar && similarItems.length === 0 ? (
                <DetailMoreLikeRow items={[]} showSkeletonSlot />
              ) : similarItems.length > 0 ? (
                <DetailMoreLikeRow
                  items={similarItems}
                  showSkeletonSlot={false}
                  onItemPress={(item) => openSimilar(item.id)}
                  onNearEnd={data?.fetchMoreSimilar}
                />
              ) : null}
            </>
          ) : null}
        </View>
      </ScrollView>

      <View
        style={[styles.bottomFade, { height: spacing.detailBottomFade }]}
        pointerEvents="none"
      >
        <LinearGradient
          colors={['transparent', colors.surface]}
          style={StyleSheet.absoluteFill}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  body: {
    marginTop: -spacing.detailContentOverlap,
    paddingHorizontal: spacing.detailPagePaddingHorizontal,
    zIndex: 1,
  },
  displayTitle: {
    ...typography['display-md'],
    color: colors.on_surface,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  meta: {
    marginBottom: spacing.xl,
  },
  castHeading: {
    ...typography['headline-detail'],
    color: colors.on_surface,
    marginBottom: spacing.md,
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  banner: {
    paddingHorizontal: spacing.detailPagePaddingHorizontal,
    paddingTop: spacing.md,
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
    marginBottom: spacing.sm,
  },
  errText: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
  },
  fallback: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
    marginBottom: spacing['5xl'],
  },
});
