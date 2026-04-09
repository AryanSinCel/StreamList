import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ContentRow } from '../components/home/ContentRow';
import { GenreChipStrip } from '../components/home/GenreChipStrip';
import { HomeHeader } from '../components/home/HomeHeader';
import { HomeHeroCard } from '../components/home/HomeHeroCard';
import { HomeLoadingFooter } from '../components/home/HomeLoadingFooter';
import {
  ACTION_POSTERS,
  TRENDING_POSTERS,
  TOP_RATED_POSTERS,
} from '../components/home/homeMockContent';
import type { HomeScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const PLACEHOLDER_DETAIL_ID = 550;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const goPlaceholderDetail = () => {
    navigation.navigate('Detail', {
      id: PLACEHOLDER_DETAIL_ID,
      mediaType: 'movie',
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.root}>
        <HomeHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <GenreChipStrip />
          <HomeHeroCard
            onPressWatch={goPlaceholderDetail}
            onPressDetails={goPlaceholderDetail}
          />
          <ContentRow
            title="Trending Now"
            items={TRENDING_POSTERS}
            onSeeAllPress={goPlaceholderDetail}
            onItemPress={goPlaceholderDetail}
          />
          <ContentRow
            title="Top Rated"
            items={TOP_RATED_POSTERS}
            onSeeAllPress={goPlaceholderDetail}
            onItemPress={goPlaceholderDetail}
          />
          <ContentRow
            title="Action"
            items={ACTION_POSTERS}
            marginBottom={spacing.screenBlockLarge}
            onSeeAllPress={goPlaceholderDetail}
            onItemPress={goPlaceholderDetail}
          />
          <HomeLoadingFooter />
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
    paddingBottom: spacing['9xl'],
  },
});
