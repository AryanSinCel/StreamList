import React, { useCallback } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { spacing } from '../../theme/spacing';
import { DetailPortraitCard } from './DetailPortraitCard';
import { DetailPosterSkeletonSlot } from './DetailPosterSkeletonSlot';

const NEAR_END_PAD =
  3 * (spacing.detailPosterCardWidth + spacing.md);

export interface DetailMoreLikeItem {
  id: number;
  title: string;
  posterUri: string | null;
}

export interface DetailMoreLikeRowProps {
  items: readonly DetailMoreLikeItem[];
  showSkeletonSlot?: boolean;
  onItemPress?: (item: DetailMoreLikeItem) => void;
  onNearEnd?: () => void;
}

export function DetailMoreLikeRow({
  items,
  showSkeletonSlot = true,
  onItemPress,
  onNearEnd,
}: DetailMoreLikeRowProps) {
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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      {items.map((item) => {
        const card = (
          <DetailPortraitCard title={item.title} posterUri={item.posterUri} />
        );
        if (onItemPress) {
          return (
            <Pressable
              key={item.id}
              accessibilityRole="button"
              onPress={() => onItemPress(item)}
              style={({ pressed }) => pressed && styles.pressed}
            >
              {card}
            </Pressable>
          );
        }
        return <React.Fragment key={item.id}>{card}</React.Fragment>;
      })}
      {showSkeletonSlot ? <DetailPosterSkeletonSlot /> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingBottom: spacing['5xl'],
  },
  pressed: {
    opacity: 0.92,
  },
});
