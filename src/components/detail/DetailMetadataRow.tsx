import React from 'react';
import { StyleSheet, View } from 'react-native';

import { StarIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { DetailMetaChip } from './DetailMetaChip';

export interface DetailMetadataRowProps {
  year: string;
  ratingLabel: string;
  genre: string;
  runtime: string;
}

export function DetailMetadataRow({
  year,
  ratingLabel,
  genre,
  runtime,
}: DetailMetadataRowProps) {
  return (
    <View style={styles.row}>
      <DetailMetaChip label={year} />
      <DetailMetaChip
        label={ratingLabel}
        leading={
          <StarIcon color={colors.primary_container} size={spacing.smPlus} />
        }
      />
      <DetailMetaChip label={genre} />
      <DetailMetaChip label={runtime} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
