import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export interface DetailSynopsisSectionProps {
  body: string;
  expanded?: boolean;
  onReadMorePress?: () => void;
}

export function DetailSynopsisSection({
  body,
  expanded = false,
  onReadMorePress,
}: DetailSynopsisSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Synopsis</Text>
      <Text style={styles.body} numberOfLines={expanded ? undefined : 3}>
        {body}{' '}
        <Text
          accessibilityRole="button"
          style={styles.readMore}
          onPress={onReadMorePress}
        >
          {expanded ? 'Show less' : 'Read more'}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing['5xl'],
  },
  title: {
    ...typography['headline-detail'],
    color: colors.on_surface,
    marginBottom: spacing.sm,
  },
  body: {
    ...typography['body-md'],
    color: colors.on_surface_variant,
    lineHeight: spacing['2xl'],
  },
  readMore: {
    ...typography['body-md'],
    color: colors.primary_container,
    fontWeight: '600',
  },
});
