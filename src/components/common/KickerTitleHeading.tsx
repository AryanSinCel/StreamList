import React from 'react';
import { StyleSheet, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface KickerTitleHeadingProps {
  kicker: string;
  title: string;
  footnote?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function KickerTitleHeading({
  kicker,
  title,
  footnote,
  style,
  testID,
}: KickerTitleHeadingProps) {
  return (
    <View style={[styles.wrap, style]} testID={testID}>
      <Text style={styles.kicker}>{kicker}</Text>
      <Text style={styles.title}>{title}</Text>
      {footnote ? <Text style={styles.footnote}>{footnote}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing['5xl'],
  },
  kicker: {
    ...typography['label-xs'],
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: spacing.trackingWidest,
    marginBottom: spacing.sm,
  },
  title: {
    ...typography['display-md'],
    color: colors.on_surface,
  },
  footnote: {
    ...typography['body-md'],
    fontWeight: '500',
    color: colors.on_surface_variant,
    marginTop: spacing.xxs,
  },
});
