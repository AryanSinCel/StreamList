import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface DetailMetaChipProps {
  label: string;
  /** Optional leading icon (e.g. star for rating) */
  leading?: React.ReactNode;
}

export function DetailMetaChip({ label, leading }: DetailMetaChipProps) {
  return (
    <View style={styles.chip}>
      {leading ? <View style={styles.leading}>{leading}</View> : null}
      <Text style={styles.text} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: radii.md,
    backgroundColor: colors.surface_container_highest,
    gap: spacing.xxs,
  },
  leading: {
    justifyContent: 'center',
  },
  text: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
  },
});
