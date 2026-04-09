import React from 'react';
import { StyleSheet, View } from 'react-native';

import { OutlinedGhostCtaButton } from '../common/OutlinedGhostCtaButton';
import { PrimaryGradientCtaButton } from '../common/PrimaryGradientCtaButton';
import { BookmarkAddIcon, BookmarkAddedIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export interface DetailWatchlistActionsProps {
  /** When false, buttons are disabled (store not hydrated). */
  hydrated: boolean;
  isInWatchlist: boolean;
  onAddPress?: () => void;
  onInWatchlistPress?: () => void;
}

export function DetailWatchlistActions({
  hydrated,
  isInWatchlist,
  onAddPress,
  onInWatchlistPress,
}: DetailWatchlistActionsProps) {
  if (!hydrated) {
    return <View style={styles.block} />;
  }

  if (isInWatchlist) {
    return (
      <View style={styles.block}>
        <OutlinedGhostCtaButton
          label="In Watchlist"
          icon={
            <BookmarkAddedIcon
              color={colors.primary_container}
              size={spacing.lg}
            />
          }
          onPress={onInWatchlistPress}
        />
      </View>
    );
  }

  return (
    <View style={styles.block}>
      <PrimaryGradientCtaButton
        label="Add to Watchlist"
        icon={
          <BookmarkAddIcon color={colors.on_primary} size={spacing.lg} />
        }
        onPress={onAddPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: spacing.md,
    marginBottom: spacing['5xl'],
  },
});
