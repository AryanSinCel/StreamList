import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CloseIcon, HistoryIcon } from '../icons/svgIcons';
import { RECENT_SEARCHES } from './searchMockContent';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface RecentSearchesBlockProps {
  onClearAllPress?: () => void;
  onRowPress?: (term: string) => void;
  onDismissPress?: (term: string) => void;
}

export function RecentSearchesBlock({
  onClearAllPress,
  onRowPress,
  onDismissPress,
}: RecentSearchesBlockProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Searches</Text>
        <Pressable
          accessibilityRole="button"
          onPress={onClearAllPress}
          hitSlop={spacing.xs}
        >
          <Text style={styles.clear}>Clear All</Text>
        </Pressable>
      </View>
      <View style={styles.list}>
        {RECENT_SEARCHES.map((term) => (
          <View key={term} style={styles.row}>
            <Pressable
              accessibilityRole="button"
              onPress={() => onRowPress?.(term)}
              style={({ pressed }) => [
                styles.rowMain,
                pressed && styles.rowPressed,
              ]}
            >
              <HistoryIcon
                color={colors.on_surface_variant}
                size={spacing.xl}
              />
              <Text style={styles.term}>{term}</Text>
            </Pressable>
            <Pressable
              accessibilityLabel={`Remove ${term}`}
              hitSlop={spacing.sm}
              onPress={() => onDismissPress?.(term)}
              style={({ pressed }) => pressed && styles.dismissPressed}
            >
              <CloseIcon color={colors.on_surface_variant} size={spacing.lg} />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing['5xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  title: {
    ...typography['headline-md'],
    color: colors.on_surface,
  },
  clear: {
    ...typography['label-sm'],
    fontWeight: '600',
    color: colors.primary_container,
    textTransform: 'uppercase',
    letterSpacing: spacing.sm,
  },
  list: {
    gap: spacing.single,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.smPlus,
    paddingHorizontal: spacing.md,
    borderRadius: radii.lg,
  },
  rowMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
    paddingVertical: spacing.xxs,
    marginRight: spacing.sm,
  },
  rowPressed: {
    backgroundColor: colors.surface_container_low,
    borderRadius: radii.lg,
  },
  term: {
    ...typography['body-md'],
    color: colors.on_surface,
  },
  dismissPressed: {
    opacity: 0.72,
  },
});
