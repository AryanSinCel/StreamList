import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { DetailScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export function DetailScreen({ route }: DetailScreenProps) {
  const { id, mediaType } = route.params;

  return (
    <View style={styles.fill}>
      <Text style={[typography['body-md'], { color: colors.on_surface }]}>
        Detail — {mediaType} #{id}
      </Text>
      <Text style={[typography['label-sm'], { color: colors.on_surface_variant }]}>
        Placeholder (navigation shell only)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
