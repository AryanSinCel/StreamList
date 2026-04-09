import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { AppHeaderBar } from '../common/AppHeaderBar';
import { RingAvatar } from '../common/RingAvatar';
import { SearchIcon } from '../icons/svgIcons';
import { WATCHLIST_PROFILE_URI } from './watchlistMockContent';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';

export interface WatchlistHeaderProps {
  onSearchPress?: () => void;
}

export function WatchlistHeader({ onSearchPress }: WatchlistHeaderProps) {
  return (
    <AppHeaderBar
      rightSlot={
        <>
          <Pressable
            accessibilityLabel="Search"
            accessibilityRole="button"
            onPress={onSearchPress}
            style={({ pressed }) => [styles.iconBtn, pressed && styles.iconBtnPressed]}
            hitSlop={spacing.xs}
          >
            <SearchIcon color={colors.on_surface_variant} size={spacing.xl} />
          </Pressable>
          <RingAvatar
            imageUri={WATCHLIST_PROFILE_URI}
            borderColor={colors.outline_variant}
            fillColor={colors.surface_container_high}
          />
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  iconBtn: {
    padding: spacing.xs,
    borderRadius: radii.full,
  },
  iconBtnPressed: {
    backgroundColor: colors.surface_container_highest,
  },
});
