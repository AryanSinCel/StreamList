import React from 'react';
import { StyleSheet, View } from 'react-native';

import { StarIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { DetailMetaChip } from './DetailMetaChip';

export interface DetailMetadataRowProps {
  year?: string | null;
  ratingLabel?: string | null;
  genre?: string | null;
  runtime?: string | null;
}

export function DetailMetadataRow({
  year,
  ratingLabel,
  genre,
  runtime,
}: DetailMetadataRowProps) {
  return (
    <View style={styles.row}>
      {year ? <DetailMetaChip label={year} /> : null}
      {ratingLabel ? (
        <DetailMetaChip
          label={ratingLabel}
          leading={
            <StarIcon color={colors.primary_container} size={spacing.smPlus} />
          }
        />
      ) : null}
      {genre ? <DetailMetaChip label={genre} /> : null}
      {runtime ? <DetailMetaChip label={runtime} /> : null}
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
