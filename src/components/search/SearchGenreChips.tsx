import React, { useState } from 'react';

import { HorizontalSelectableChips } from '../common/HorizontalSelectableChips';
import { SEARCH_GENRE_LABELS } from './searchMockContent';
import { spacing } from '../../theme/spacing';

export function SearchGenreChips() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <HorizontalSelectableChips
      labels={SEARCH_GENRE_LABELS}
      selectedIndex={selectedIndex}
      onSelectIndex={setSelectedIndex}
      idleBackground="highest"
      pressTint="bright"
      contentContainerStyle={{
        paddingBottom: spacing.sm,
      }}
    />
  );
}
