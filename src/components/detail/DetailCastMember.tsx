import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface DetailCastMemberProps {
  name: string;
  character: string;
  photoUri: string | null;
}

export function DetailCastMember({
  name,
  character,
  photoUri,
}: DetailCastMemberProps) {
  const hasPhoto = photoUri != null && photoUri.length > 0;

  return (
    <View style={styles.cell}>
      {hasPhoto ? (
        <Image
          accessibilityIgnoresInvertColors
          source={{ uri: photoUri as string }}
          style={styles.avatar}
        />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]} />
      )}
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
  avatarPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...typography['label-cast-name'],
    color: colors.on_surface,
    textAlign: 'center',
  },
  role: {
    ...typography['label-cast-role'],
    color: colors.on_surface_variant,
    textAlign: 'center',
    marginTop: spacing.xxs,
  },
});
