import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { RecentSearchesBlock } from '../components/search/RecentSearchesBlock';
import { SearchGenreChips } from '../components/search/SearchGenreChips';
import { SearchHeader } from '../components/search/SearchHeader';
import { SearchTextField } from '../components/search/SearchTextField';
import { SearchTrendingSection } from '../components/search/SearchTrendingSection';
import type { SearchScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const PLACEHOLDER_DETAIL_ID = 550;

/**
 * Search default state — static mock + local chip selection only (no TMDB / `useSearch` yet).
 */
export function SearchScreen({ navigation }: SearchScreenProps) {
  const insets = useSafeAreaInsets();

  const openPlaceholderDetail = () => {
    navigation.navigate('Detail', {
      id: PLACEHOLDER_DETAIL_ID,
      mediaType: 'movie',
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.root}>
        <SearchHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: insets.bottom + spacing.searchScrollBottom,
            },
          ]}
        >
          <View style={styles.page}>
            <SearchTextField />
            <SearchGenreChips />
            <RecentSearchesBlock />
            <SearchTrendingSection
              onFeaturedPress={openPlaceholderDetail}
              onPosterPress={openPlaceholderDetail}
            />
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
    paddingHorizontal: spacing.searchPagePaddingHorizontal,
    paddingTop: spacing.xs,
  },
});
