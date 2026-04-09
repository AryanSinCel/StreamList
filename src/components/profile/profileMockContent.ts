/**
 * Static profile shell (no auth / preferences logic).
 */

export const PROFILE_AVATAR_URI =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCTeGvS_jcuJ7iy6UGYBwTdGWK23sx_-canmSGsd2_Odci9j-xc1YxOoR2f1h_rsc5hDZ-pqajZewz06Se6Pg6g2Xmkp8LX4_jRfVAD2cjjJyKQoWVzcmrUwkiMXWsl7acBuekMylo7VntV0C6siZ7pF54wUNKyol8rdJuerdd67euwFI281b9uFuyvBuEGOV74mvoFR02EhiwMXQ72kkPdokMvakSUrkx7fHzWRb9fj-szCf_GNHRM3aIkva-aqxQbBB1OaUbWg4mA';

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
