import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArrowBackIcon, ShareIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { DetailIconButton } from './DetailIconButton';

export interface DetailTopBarProps {
  onBackPress: () => void;
  onSharePress?: () => void;
}

export function DetailTopBar({ onBackPress, onSharePress }: DetailTopBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[styles.bar, { paddingTop: insets.top + spacing.sm }]}
      pointerEvents="box-none"
    >
      <DetailIconButton
        accessibilityLabel="Go back"
        onPress={onBackPress}
      >
        <ArrowBackIcon color={colors.on_surface} size={spacing.iconMd} />
      </DetailIconButton>
      <View style={styles.right}>
        <DetailIconButton
          accessibilityLabel="Share"
          onPress={onSharePress}
        >
          <ShareIcon color={colors.on_surface} size={spacing.iconMd} />
        </DetailIconButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.detailPagePaddingHorizontal,
    paddingBottom: spacing.sm,
    zIndex: 2,
  },
  right: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
