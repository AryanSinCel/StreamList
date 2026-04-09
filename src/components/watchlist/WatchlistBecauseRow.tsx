import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { WatchlistLandscapeItem } from '../../types/watchlistLandscape';
import { WatchlistLandscapeCard } from './WatchlistLandscapeCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface WatchlistBecauseRowProps {
  title: string;
  items: readonly WatchlistLandscapeItem[];
  onViewAllPress?: () => void;
  onItemPress?: (index: number) => void;
}

export function WatchlistBecauseRow({
  title,
  items,
  onViewAllPress,
  onItemPress,
}: WatchlistBecauseRowProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={2}>
          {title}
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={onViewAllPress}
          hitSlop={spacing.xs}
        >
          <Text style={styles.action}>View All</Text>
        </Pressable>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {items.map((item, index) => (
          <WatchlistLandscapeCard
            key={item.id}
            item={item}
            onPress={() => onItemPress?.(index)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.screenBlockLarge,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  headerTitle: {
    ...typography['headline-md'],
    color: colors.on_surface,
    flex: 1,
    minWidth: 0,
  },
  action: {
    ...typography['title-sm'],
    color: colors.primary_container,
    fontWeight: '700',
  },
  scroll: {
    flexDirection: 'row',
    gap: spacing.xl,
    paddingBottom: spacing.md,
  },
});
