import React from 'react';
import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';

export interface RingAvatarProps {
  imageUri: string;
  /** Ring colour — pass a token from `colors` (e.g. `colors.avatar_ring`). */
  borderColor: string;
  /** Inner fill behind the image. */
  fillColor?: string;
  size?: number;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function RingAvatar({
  imageUri,
  borderColor,
  fillColor = colors.surface_container_highest,
  size = spacing.searchHeaderAvatar,
  accessibilityLabel = 'Profile',
  style,
  testID,
}: RingAvatarProps) {
  return (
    <View
      style={[
        styles.ring,
        {
          width: size,
          height: size,
          borderRadius: radii.full,
          borderColor,
          backgroundColor: fillColor,
        },
        style,
      ]}
      testID={testID}
    >
      <Image
        accessibilityIgnoresInvertColors
        accessibilityLabel={accessibilityLabel}
        source={{ uri: imageUri }}
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ring: {
    borderWidth: spacing.border_thick,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});
