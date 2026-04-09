import React from 'react';
import {
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { AppBrandWordmark } from './AppBrandWordmark';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export interface AppHeaderBarProps {
  /** Defaults to `AppBrandWordmark`. */
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  /**
   * `compact` — fixed height bar (Home).
   * `comfortable` — vertical padding (Search / Watchlist / Profile).
   */
  paddingVariant?: 'compact' | 'comfortable';
  /** Passed to `AppBrandWordmark` when `leftSlot` is omitted. */
  brandIconSize?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function AppHeaderBar({
  leftSlot,
  rightSlot,
  paddingVariant = 'comfortable',
  brandIconSize,
  style,
  testID,
}: AppHeaderBarProps) {
  const left = leftSlot ?? (
    <AppBrandWordmark iconSize={brandIconSize ?? spacing.xl} />
  );

  return (
    <View
      style={[
        styles.row,
        paddingVariant === 'compact' ? styles.compact : styles.comfortable,
        style,
      ]}
      testID={testID}
    >
      {left}
      {rightSlot ? <View style={styles.right}>{rightSlot}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['3xl'],
    backgroundColor: colors.surface,
  },
  compact: {
    height: spacing.headerBarHeight,
  },
  comfortable: {
    paddingVertical: spacing.xl,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
});
