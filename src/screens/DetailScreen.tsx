import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DetailCastRow } from '../components/detail/DetailCastRow';
import {
  DETAIL_BACKDROP_URI,
  DETAIL_CAST,
  DETAIL_OVERVIEW,
  DETAIL_SIMILAR,
  DETAIL_TITLE,
} from '../components/detail/detailMockContent';
import { DetailHeroBackdrop } from '../components/detail/DetailHeroBackdrop';
import { DetailMetadataRow } from '../components/detail/DetailMetadataRow';
import { DetailMoreLikeRow } from '../components/detail/DetailMoreLikeRow';
import { DetailSectionHeader } from '../components/detail/DetailSectionHeader';
import { DetailSynopsisSection } from '../components/detail/DetailSynopsisSection';
import { DetailTopBar } from '../components/detail/DetailTopBar';
import { DetailWatchlistActions } from '../components/detail/DetailWatchlistActions';
import type { DetailScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Detail layout — static mock content only (no TMDB hooks).
 * Data wiring: `useMovieDetail` + section skeletons per project-spec §7.3.
 */
export function DetailScreen({ navigation }: DetailScreenProps) {
  const insets = useSafeAreaInsets();

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
        <DetailHeroBackdrop imageUri={DETAIL_BACKDROP_URI}>
          <DetailTopBar
            onBackPress={() => navigation.goBack()}
            onSharePress={() => undefined}
          />
        </DetailHeroBackdrop>

        <View style={styles.body}>
          <Text style={styles.displayTitle} numberOfLines={3}>
            {DETAIL_TITLE.toUpperCase()}
          </Text>

          <View style={styles.meta}>
            <DetailMetadataRow
              year="2024"
              ratingLabel="9.2 Rating"
              genre="Sci-Fi"
              runtime="1h 48m"
            />
          </View>

          <DetailWatchlistActions
            stateLabel="Watchlist state: added"
            onAddPress={() => undefined}
            onInWatchlistPress={() => undefined}
          />

          <DetailSynopsisSection
            body={DETAIL_OVERVIEW}
            onReadMorePress={() => undefined}
          />

          <Text style={styles.castHeading}>Cast</Text>
          <DetailCastRow members={[...DETAIL_CAST]} showSkeletonSlot />

          <DetailSectionHeader title="More Like This" actionLabel="See All" />
          <DetailMoreLikeRow items={[...DETAIL_SIMILAR]} showSkeletonSlot />
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
    ...typography['headline-md'],
    color: colors.on_surface,
    marginBottom: spacing.md,
  },
  bottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
