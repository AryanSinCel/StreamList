import React, { useState } from 'react';

import { HorizontalSelectableChips } from '../common/HorizontalSelectableChips';
import { GENRE_LABELS } from './homeMockContent';
import { spacing } from '../../theme/spacing';

export function GenreChipStrip() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <HorizontalSelectableChips
      labels={GENRE_LABELS}
      selectedIndex={selectedIndex}
      onSelectIndex={setSelectedIndex}
      idleBackground="low"
      pressTint="high"
      contentContainerStyle={{
        paddingHorizontal: spacing['3xl'],
      }}
    />
  );
}
