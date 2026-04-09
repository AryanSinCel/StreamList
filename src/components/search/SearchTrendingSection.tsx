import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { SearchGridItem } from '../../types/searchGrid';
import { SearchGridPosterCard } from './SearchGridPosterCard';
import { SearchTrendingFeatured } from './SearchTrendingFeatured';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface SearchTrendingSectionProps {
  featuredBackdropUri: string | null;
  featuredTitle: string;
  featuredMeta: string;
  gridItems: readonly SearchGridItem[];
  loading?: boolean;
  onFeaturedPress?: () => void;
  onPosterPress?: (item: SearchGridItem) => void;
}

export function SearchTrendingSection({
  featuredBackdropUri,
  featuredTitle,
  featuredMeta,
  gridItems,
  loading = false,
  onFeaturedPress,
  onPosterPress,
}: SearchTrendingSectionProps) {
  const [a, b, c] = gridItems;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Trending Now</Text>
      <SearchTrendingFeatured
        backdropUri={featuredBackdropUri}
        title={featuredTitle}
        meta={featuredMeta}
        loading={loading}
        onPress={onFeaturedPress}
      />
      <View style={styles.row}>
        {a ? (
          <SearchGridPosterCard
            item={a}
            onPress={() => onPosterPress?.(a)}
          />
        ) : (
          <View style={styles.flexSpacer} />
        )}
        <View style={styles.gap} />
        {b ? (
          <SearchGridPosterCard
            item={b}
            onPress={() => onPosterPress?.(b)}
          />
        ) : (
          <View style={styles.flexSpacer} />
        )}
      </View>
      <View style={styles.row}>
        {c ? (
          <SearchGridPosterCard
            item={c}
            onPress={() => onPosterPress?.(c)}
          />
        ) : (
          <View style={styles.flexSpacer} />
        )}
        <View style={styles.gap} />
        <View style={styles.flexSpacer} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing['5xl'],
  },
  heading: {
    ...typography['headline-sm'],
    color: colors.on_surface,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.searchGridGap,
  },
  gap: {
    width: spacing.searchGridGap,
  },
  flexSpacer: {
    flex: 1,
    minWidth: 0,
  },
});
