import React from 'react';

import { AppHeaderBar } from '../common/AppHeaderBar';
import { RingAvatar } from '../common/RingAvatar';
import { SEARCH_PROFILE_URI } from './searchMockContent';
import { colors } from '../../theme/colors';

export function SearchHeader() {
  return (
    <AppHeaderBar
      rightSlot={
        <RingAvatar
          imageUri={SEARCH_PROFILE_URI}
          borderColor={colors.avatar_ring}
        />
      }
    />
  );
}
