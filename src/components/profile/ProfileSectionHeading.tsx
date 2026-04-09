import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface ProfileSectionHeadingProps {
  title: string;
}

export function ProfileSectionHeading({ title }: ProfileSectionHeadingProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.sm,
  },
  text: {
    ...typography['label-xs'],
    color: colors.on_surface_variant,
    textTransform: 'uppercase',
    letterSpacing: spacing.trackingWidest,
  },
});
