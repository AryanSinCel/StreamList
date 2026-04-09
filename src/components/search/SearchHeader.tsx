import React from 'react';

import { AppHeaderBar } from '../common/AppHeaderBar';
import { RingAvatar } from '../common/RingAvatar';
import { PROFILE_AVATAR_URI } from '../profile/profileMockContent';
import { colors } from '../../theme/colors';

export function SearchHeader() {
  return (
    <AppHeaderBar
      rightSlot={
        <RingAvatar
          imageUri={PROFILE_AVATAR_URI}
          borderColor={colors.avatar_ring}
        />
      }
    />
  );
}
