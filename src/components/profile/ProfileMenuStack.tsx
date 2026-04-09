import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { ProfileMenuItem } from './profileMockContent';
import { ProfileMenuRow } from './ProfileMenuRow';
import { ProfileSectionHeading } from './ProfileSectionHeading';
import { spacing } from '../../theme/spacing';

export interface ProfileMenuStackProps {
  sectionTitle: string;
  items: readonly ProfileMenuItem[];
  onItemPress?: (id: string) => void;
  /** Pass through to rows (e.g. accent for sign out). */
  rowVariant?: 'default' | 'accent';
}

export function ProfileMenuStack({
  sectionTitle,
  items,
  onItemPress,
  rowVariant = 'default',
}: ProfileMenuStackProps) {
  return (
    <View style={styles.section}>
      <ProfileSectionHeading title={sectionTitle} />
      <View style={styles.stack}>
        {items.map((item) => (
          <ProfileMenuRow
            key={item.id}
            item={item}
            variant={rowVariant}
            onPress={() => onItemPress?.(item.id)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing['5xl'],
  },
  stack: {
    gap: spacing.sm,
  },
});
