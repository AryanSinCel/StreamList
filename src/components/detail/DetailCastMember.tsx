import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface DetailCastMemberProps {
  name: string;
  character: string;
  photoUri: string;
}

export function DetailCastMember({
  name,
  character,
  photoUri,
}: DetailCastMemberProps) {
  return (
    <View style={styles.cell}>
      <Image
        accessibilityIgnoresInvertColors
        source={{ uri: photoUri }}
        style={styles.avatar}
      />
      <Text style={styles.name} numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.role} numberOfLines={1}>
        {character}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: spacing.detailCastAvatar,
    alignItems: 'center',
  },
  avatar: {
    width: spacing.detailCastAvatar,
    height: spacing.detailCastAvatar,
    borderRadius: radii.full,
    marginBottom: spacing.sm,
    backgroundColor: colors.surface_container_high,
  },
  name: {
    ...typography['label-sm'],
    fontWeight: '600',
    color: colors.on_surface,
    textAlign: 'center',
  },
  role: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
    textAlign: 'center',
    marginTop: spacing.xxs,
  },
});
