import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { spacing } from '../../theme/spacing';
import { DetailCastMember, type DetailCastMemberProps } from './DetailCastMember';
import { DetailCastSkeletonSlot } from './DetailCastSkeletonSlot';

export interface DetailCastRowProps {
  members: readonly DetailCastMemberProps[];
  showSkeletonSlot?: boolean;
}

export function DetailCastRow({
  members,
  showSkeletonSlot = true,
}: DetailCastRowProps) {
  return (
    <View style={styles.section}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {members.map((m) => (
          <DetailCastMember
            key={`${m.name}-${m.character}`}
            {...m}
          />
        ))}
        {showSkeletonSlot ? <DetailCastSkeletonSlot /> : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing['5xl'],
  },
  scroll: {
    flexDirection: 'row',
    gap: spacing.xl,
    paddingBottom: spacing['2xl'],
  },
});
