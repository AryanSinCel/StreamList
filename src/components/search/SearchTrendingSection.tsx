import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SEARCH_TRENDING_GRID } from './searchMockContent';
import { SearchGridPosterCard } from './SearchGridPosterCard';
import { SearchTrendingFeatured } from './SearchTrendingFeatured';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface SearchTrendingSectionProps {
  onFeaturedPress?: () => void;
  onPosterPress?: (index: number) => void;
}

export function SearchTrendingSection({
  onFeaturedPress,
  onPosterPress,
}: SearchTrendingSectionProps) {
  const [a, b, c] = SEARCH_TRENDING_GRID;

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Trending Now</Text>
      <SearchTrendingFeatured onPress={onFeaturedPress} />
      <View style={styles.row}>
        <SearchGridPosterCard
          item={a}
          onPress={() => onPosterPress?.(0)}
        />
        <View style={styles.gap} />
        <SearchGridPosterCard
          item={b}
          onPress={() => onPosterPress?.(1)}
        />
      </View>
      <View style={styles.row}>
        <SearchGridPosterCard
          item={c}
          onPress={() => onPosterPress?.(2)}
        />
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
