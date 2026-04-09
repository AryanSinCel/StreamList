import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { PosterItem } from './homeMockContent';
import { MoviePosterCard } from './MoviePosterCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface ContentRowProps {
  title: string;
  items: PosterItem[];
  onSeeAllPress?: () => void;
  onItemPress?: (item: PosterItem) => void;
  marginBottom?: number;
}

export function ContentRow({
  title,
  items,
  onSeeAllPress,
  onItemPress,
  marginBottom = spacing['9xl'],
}: ContentRowProps) {
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
      >
        {items.map((item) => (
          <MoviePosterCard
            key={item.id}
            posterUri={item.posterUri}
            title={item.title}
            subtitle={item.subtitle}
            onPress={onItemPress ? () => onItemPress(item) : undefined}
          />
        ))}
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
