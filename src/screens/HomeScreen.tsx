import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { HomeScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.fill}>
      <Text style={[typography['body-md'], { color: colors.on_surface }]}>
        Home
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() =>
          navigation.navigate('Detail', { id: 550, mediaType: 'movie' })
        }
        style={styles.link}
      >
        <Text style={[typography['label-sm'], { color: colors.primary_container }]}>
          Open detail (placeholder)
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  link: {
    marginTop: spacing.md,
    padding: spacing.sm,
  },
});
