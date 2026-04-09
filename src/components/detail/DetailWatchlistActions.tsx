import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { BookmarkAddIcon, BookmarkAddedIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { DetailOutlinedCtaButton } from './DetailOutlinedCtaButton';
import { DetailPrimaryCtaButton } from './DetailPrimaryCtaButton';

export interface DetailWatchlistActionsProps {
  stateLabel: string;
  onAddPress?: () => void;
  onInWatchlistPress?: () => void;
}

/**
 * Stitch shows both primary “Add” and secondary “In Watchlist” for layout reference.
 * Spec §7.3: default gradient vs added outlined — composed here without store logic.
 */
export function DetailWatchlistActions({
  stateLabel,
  onAddPress,
  onInWatchlistPress,
}: DetailWatchlistActionsProps) {
  return (
    <View style={styles.block}>
      <DetailPrimaryCtaButton
        label="Add to Watchlist"
        icon={
          <BookmarkAddIcon color={colors.on_primary} size={spacing.lg} />
        }
        onPress={onAddPress}
      />
      <View style={styles.secondaryBlock}>
        <Text style={styles.stateCaption}>{stateLabel}</Text>
        <DetailOutlinedCtaButton
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
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    gap: spacing.md,
    marginBottom: spacing['5xl'],
  },
  secondaryBlock: {
    paddingTop: spacing.lg,
    gap: spacing.sm,
  },
  stateCaption: {
    ...typography['label-xs'],
    color: colors.on_surface_variant,
    textTransform: 'uppercase',
    letterSpacing: spacing.trackingWidest,
    opacity: 0.72,
  },
});
