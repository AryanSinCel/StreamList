import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { MovieIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface AppBrandWordmarkProps {
  /** Defaults to `spacing.xl` (24) — same on every tab header. */
  iconSize?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function AppBrandWordmark({
  iconSize = spacing.xl,
  style,
  testID,
}: AppBrandWordmarkProps) {
  return (
    <View style={[styles.brand, style]} testID={testID}>
      <MovieIcon color={colors.primary_container} size={iconSize} />
      <Text style={styles.wordmark}>StreamList</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  wordmark: {
    ...typography['headline-md'],
    color: colors.primary_container,
    textTransform: 'uppercase',
  },
});
