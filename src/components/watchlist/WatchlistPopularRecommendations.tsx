import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SearchGridPosterCard } from '../search/SearchGridPosterCard';
import type { SearchGridItem } from '../../types/searchGrid';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface WatchlistPopularRecommendationsProps {
  /** First two cells — TMDB trending (see `useWatchlistFeed` `emptyTrending`). */
  items: SearchGridItem[];
  onItemPress: (id: number) => void;
}

/**
 * “Popular Recommendations” row for empty watchlist — real posters from TMDB trending.
 */
export function WatchlistPopularRecommendations({
  items,
  onItemPress,
}: WatchlistPopularRecommendationsProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Popular Recommendations</Text>
      <View style={styles.row}>
        {items.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 ? <View style={styles.gap} /> : null}
            <View style={styles.cell}>
              <SearchGridPosterCard
                item={item}
                onPress={() => onItemPress(item.id)}
              />
            </View>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.screenBlockLarge,
  },
  heading: {
    ...typography['label-xs'],
    color: colors.on_surface_variant,
    textTransform: 'uppercase',
    letterSpacing: spacing.trackingWidest,
    marginBottom: spacing.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  gap: {
    width: spacing.watchlistGridGap,
  },
  cell: {
    flex: 1,
    minWidth: 0,
  },
});
