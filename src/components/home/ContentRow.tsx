import React, { useCallback } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { HomeCarouselSkeletonStrip } from './HomeCarouselSkeletonStrip';
import { MoviePosterCard } from './MoviePosterCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import type { PosterItem } from '../../types/poster';

const NEAR_END_PAD =
  3 * (spacing.homePosterWidth + spacing['3xl']);

export interface ContentRowProps {
  title: string;
  items: PosterItem[];
  /** Initial fetch in progress (empty horizontal strip). */
  loading?: boolean;
  onSeeAllPress?: () => void;
  onItemPress?: (item: PosterItem) => void;
  marginBottom?: number;
  /** Fires when the user scrolls within ~3 cards of the row end (pagination). */
  onNearEnd?: () => void;
}

export function ContentRow({
  title,
  items,
  loading = false,
  onSeeAllPress,
  onItemPress,
  marginBottom = spacing['9xl'],
  onNearEnd,
}: ContentRowProps) {
  const handleScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!onNearEnd) {
        return;
      }
      const { contentOffset, layoutMeasurement, contentSize } = e.nativeEvent;
      const distanceFromEnd =
        contentSize.width - layoutMeasurement.width - contentOffset.x;
      if (distanceFromEnd <= NEAR_END_PAD) {
        onNearEnd();
      }
    },
    [onNearEnd],
  );

  return (
    <View style={{ marginBottom }}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onSeeAllPress}
          hitSlop={spacing.sm}
        >
          <Text style={styles.seeAll}>See All</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {loading && items.length === 0 ? (
          <HomeCarouselSkeletonStrip />
        ) : (
          items.map((item) => (
            <MoviePosterCard
              key={item.id}
              posterUri={item.posterUri}
              title={item.title}
              subtitle={item.subtitle}
              onPress={onItemPress ? () => onItemPress(item) : undefined}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    paddingHorizontal: spacing['3xl'],
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    ...typography['headline-md'],
    color: colors.on_surface,
  },
  seeAll: {
    ...typography['title-sm'],
    color: colors.on_surface_variant,
  },
  carousel: {
    paddingHorizontal: spacing['3xl'],
    gap: spacing['3xl'],
    flexDirection: 'row',
  },
});
