import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { spacing } from '../../theme/spacing';
import { DetailPortraitCard } from './DetailPortraitCard';
import { DetailPosterSkeletonSlot } from './DetailPosterSkeletonSlot';

export interface DetailMoreLikeItem {
  title: string;
  posterUri: string;
}

export interface DetailMoreLikeRowProps {
  items: readonly DetailMoreLikeItem[];
  showSkeletonSlot?: boolean;
}

export function DetailMoreLikeRow({
  items,
  showSkeletonSlot = true,
}: DetailMoreLikeRowProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
    >
      {items.map((item) => (
        <DetailPortraitCard
          key={item.title}
          title={item.title}
          posterUri={item.posterUri}
        />
      ))}
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
});
