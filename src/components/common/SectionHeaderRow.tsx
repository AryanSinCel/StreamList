import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface SectionHeaderRowProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function SectionHeaderRow({
  title,
  actionLabel,
  onActionPress,
  style,
  testID,
}: SectionHeaderRowProps) {
  return (
    <View style={[styles.row, style]} testID={testID}>
      <Text style={styles.title}>{title}</Text>
      {actionLabel ? (
        <Pressable
          accessibilityRole="button"
          onPress={onActionPress}
          hitSlop={spacing.xs}
        >
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  title: {
    ...typography['headline-md'],
    color: colors.on_surface,
  },
  action: {
    ...typography['title-sm'],
    color: colors.primary_container,
  },
});
