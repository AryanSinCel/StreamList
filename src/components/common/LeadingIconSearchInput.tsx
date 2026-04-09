import React from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { SearchIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { radii } from '../../theme/radii';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface LeadingIconSearchInputProps extends Omit<TextInputProps, 'style'> {
  placeholder: string;
  testID?: string;
}

export function LeadingIconSearchInput({
  placeholder,
  accessibilityLabel = 'Search',
  placeholderTextColor = colors.on_surface_variant_muted,
  testID,
  ...textInputProps
}: LeadingIconSearchInputProps) {
  return (
    <View style={styles.wrap} testID={testID}>
      <View style={styles.icon} pointerEvents="none">
        <SearchIcon color={colors.on_surface_variant} size={spacing.iconMd} />
      </View>
      <TextInput
        accessibilityLabel={accessibilityLabel}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={styles.input}
        {...textInputProps}
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
    ...typography['body-lg'],
    color: colors.on_surface,
    backgroundColor: colors.surface_container_low,
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    paddingLeft: spacing['8xl'],
    paddingRight: spacing.md,
  },
});
