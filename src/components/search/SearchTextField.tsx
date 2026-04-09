import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import { SearchIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

const PLACEHOLDER = 'Search movies, actors, directors...';

export function SearchTextField() {
  return (
    <View style={styles.wrap}>
      <View style={styles.icon} pointerEvents="none">
        <SearchIcon color={colors.on_surface_variant} size={spacing.iconMd} />
      </View>
      <TextInput
        accessibilityLabel="Search"
        placeholder={PLACEHOLDER}
        placeholderTextColor={colors.on_surface_variant_muted}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    marginBottom: spacing['5xl'],
  },
  icon: {
    position: 'absolute',
    left: spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 1,
  },
  input: {
    ...typography['body-md'],
    color: colors.on_surface,
    backgroundColor: colors.surface_container_low,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    paddingLeft: spacing['7xl'],
    paddingRight: spacing.md,
  },
});
