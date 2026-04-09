import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BookmarkIcon } from '../icons/svgIcons';
import { WatchlistBrowseTrendingButton } from './WatchlistBrowseTrendingButton';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface WatchlistEmptyStateProps {
  onBrowsePress?: () => void;
}

/**
 * Empty watchlist — icon plate, copy, solid CTA (no extra glow layer: solid circles read as a “harsh disc” on RN vs HTML blur).
 */
export function WatchlistEmptyState({ onBrowsePress }: WatchlistEmptyStateProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.iconPlate}>
        <View style={styles.iconMuted}>
          <BookmarkIcon
            color={colors.secondary_container}
            size={spacing.watchlistEmptyBookmarkIcon}
          />
        </View>
      </View>
      <Text style={styles.heading}>Your watchlist is empty</Text>
      <Text style={styles.body}>
        {`Save movies and shows you want to watch later and they'll appear here`}
      </Text>
      <WatchlistBrowseTrendingButton onPress={onBrowsePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing['3xl'],
    maxWidth: spacing.watchlistEmptyContentMax,
    alignSelf: 'center',
    width: '100%',
  },
  iconPlate: {
    padding: spacing.watchlistEmptyIconPad,
    borderRadius: radii.full,
    backgroundColor: colors.watchlist_empty_icon_plate,
    marginBottom: spacing['3xl'],
    shadowColor: colors.secondary_container,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: spacing.md,
    elevation: spacing.xs,
  },
  iconMuted: {
    opacity: 0.5,
  },
  heading: {
    ...typography['headline-md'],
    color: colors.on_surface,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  body: {
    ...typography['body-md'],
    color: colors.on_surface_variant,
    textAlign: 'center',
    lineHeight: spacing['2xl'],
    marginBottom: spacing['5xl'],
  },
});
