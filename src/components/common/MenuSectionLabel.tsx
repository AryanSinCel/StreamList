import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface MenuSectionLabelProps {
  title: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function MenuSectionLabel({ title, style, testID }: MenuSectionLabelProps) {
  return (
    <View style={[styles.wrap, style]} testID={testID}>
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
