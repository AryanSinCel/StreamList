import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProfileIdentitySection } from '../components/profile/ProfileIdentitySection';
import { ProfileMenuStack } from '../components/profile/ProfileMenuStack';
import { ProfileStatsRow } from '../components/profile/ProfileStatsRow';
import {
  PROFILE_APP_VERSION_LABEL,
  PROFILE_AVATAR_URI,
  PROFILE_DISPLAY_NAME,
  PROFILE_EMAIL,
  PROFILE_KICKER,
  PROFILE_MENU_ACCOUNT,
  PROFILE_MENU_SESSION,
  PROFILE_MENU_SUPPORT,
  PROFILE_PAGE_TITLE,
  PROFILE_STATS,
} from '../components/profile/profileMockContent';
import { KickerTitleHeading } from '../components/common/KickerTitleHeading';
import { WatchlistHeader } from '../components/watchlist/WatchlistHeader';
import type { ProfileScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

/**
 * Profile tab — static layout only (no auth). Reuses `WatchlistHeader` chrome with Search + avatar.
 */
export function ProfileScreen({ navigation }: ProfileScreenProps) {
  const insets = useSafeAreaInsets();

  const goSearchTab = () => {
    navigation.navigate('SearchTab', { screen: 'SearchMain' });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.root}>
        <WatchlistHeader onSearchPress={goSearchTab} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: insets.bottom + spacing.profileScrollBottom,
            },
          ]}
        >
          <View style={styles.page}>
            <KickerTitleHeading kicker={PROFILE_KICKER} title={PROFILE_PAGE_TITLE} />
            <ProfileIdentitySection
              avatarUri={PROFILE_AVATAR_URI}
              displayName={PROFILE_DISPLAY_NAME}
              email={PROFILE_EMAIL}
              onEditPress={() => undefined}
            />
            <ProfileStatsRow
              items={PROFILE_STATS}
              onStatPress={() => undefined}
            />
            <ProfileMenuStack
              sectionTitle="Account"
              items={PROFILE_MENU_ACCOUNT}
              onItemPress={() => undefined}
            />
            <ProfileMenuStack
              sectionTitle="Support"
              items={PROFILE_MENU_SUPPORT}
              onItemPress={() => undefined}
            />
            <ProfileMenuStack
              sectionTitle="Session"
              items={PROFILE_MENU_SESSION}
              rowVariant="accent"
              onItemPress={() => undefined}
            />
            <Text style={styles.version}>{PROFILE_APP_VERSION_LABEL}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    flexGrow: 1,
  },
  page: {
    paddingHorizontal: spacing.profilePagePaddingHorizontal,
    paddingTop: spacing.xs,
  },
  version: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
});
