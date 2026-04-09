import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface ProfileIdentitySectionProps {
  avatarUri: string;
  displayName: string;
  email: string;
  onEditPress?: () => void;
}

export function ProfileIdentitySection({
  avatarUri,
  displayName,
  email,
  onEditPress,
}: ProfileIdentitySectionProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.avatarRing}>
        <Image
          accessibilityIgnoresInvertColors
          accessibilityLabel="Profile photo"
          source={{ uri: avatarUri }}
          style={styles.avatar}
        />
      </View>
      <Text style={styles.name}>{displayName}</Text>
      <Text style={styles.email}>{email}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={onEditPress}
        style={({ pressed }) => [
          styles.editBtn,
          pressed && styles.editPressed,
        ]}
      >
        <Text style={styles.editLabel}>Edit profile</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    marginBottom: spacing['5xl'],
  },
  avatarRing: {
    width: spacing.profileAvatarLarge,
    height: spacing.profileAvatarLarge,
    borderRadius: radii.full,
    borderWidth: spacing.border_thick,
    borderColor: colors.avatar_ring,
    overflow: 'hidden',
    marginBottom: spacing.lg,
    backgroundColor: colors.surface_container_highest,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  name: {
    ...typography['headline-md'],
    color: colors.on_surface,
    textAlign: 'center',
    marginBottom: spacing.xxs,
  },
  email: {
    ...typography['body-md'],
    color: colors.on_surface_variant,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  editBtn: {
    alignSelf: 'stretch',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.lg,
    borderWidth: spacing.single,
    borderColor: colors.outline_variant,
    backgroundColor: colors.surface_container_highest,
    alignItems: 'center',
  },
  editPressed: {
    backgroundColor: colors.surface_bright,
  },
  editLabel: {
    ...typography['title-sm'],
    color: colors.on_surface,
  },
});
