import React from 'react';

import { HorizontalSelectableChips } from '../common/HorizontalSelectableChips';
import { spacing } from '../../theme/spacing';

export interface GenreChipStripProps {
  labels: readonly string[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

export function GenreChipStrip({
  labels,
  selectedIndex,
  onSelectIndex,
}: GenreChipStripProps) {
  return (
    <HorizontalSelectableChips
      labels={labels}
      selectedIndex={selectedIndex}
      onSelectIndex={onSelectIndex}
      idleBackground="low"
      pressTint="high"
      contentContainerStyle={{
        paddingHorizontal: spacing['3xl'],
      }}
    />
  );
}
