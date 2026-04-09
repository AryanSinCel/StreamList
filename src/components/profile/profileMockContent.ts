/**
 * Static profile shell (no auth / preferences logic).
 */

import { SEARCH_PROFILE_URI } from '../search/searchMockContent';

export const PROFILE_AVATAR_URI = SEARCH_PROFILE_URI;

export const PROFILE_KICKER = 'Your Account';
export const PROFILE_PAGE_TITLE = 'Profile';

export const PROFILE_DISPLAY_NAME = 'Alex Rivera';
export const PROFILE_EMAIL = 'alex.rivera@email.com';

export const PROFILE_STATS = [
  { label: 'Saved', value: '24' },
  { label: 'Watched', value: '12' },
  { label: 'Lists', value: '3' },
] as const;

export interface ProfileMenuItem {
  id: string;
  label: string;
}

export const PROFILE_MENU_ACCOUNT: ProfileMenuItem[] = [
  { id: 'account', label: 'Account settings' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'privacy', label: 'Privacy & data' },
];

export const PROFILE_MENU_SUPPORT: ProfileMenuItem[] = [
  { id: 'help', label: 'Help center' },
  { id: 'about', label: 'About StreamList' },
];

export const PROFILE_MENU_SESSION: ProfileMenuItem[] = [
  { id: 'signout', label: 'Sign out' },
];

export const PROFILE_APP_VERSION_LABEL = 'Version 1.0.0 (build 12)';
