import React from 'react';

import { HorizontalSelectableChips } from '../common/HorizontalSelectableChips';
import { spacing } from '../../theme/spacing';

export interface SearchGenreChipsProps {
  labels: readonly string[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

export function SearchGenreChips({
  labels,
  selectedIndex,
  onSelectIndex,
}: SearchGenreChipsProps) {
  return (
    <HorizontalSelectableChips
      labels={labels}
      selectedIndex={selectedIndex}
      onSelectIndex={onSelectIndex}
      idleBackground="highest"
      pressTint="bright"
      contentContainerStyle={{
        paddingBottom: spacing.sm,
      }}
    />
  );
}
