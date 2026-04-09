import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { WatchlistBecauseRow } from '../components/watchlist/WatchlistBecauseRow';
import { WatchlistCollectionHeading } from '../components/watchlist/WatchlistCollectionHeading';
import { WatchlistEmptyState } from '../components/watchlist/WatchlistEmptyState';
import { WatchlistFilterChips } from '../components/watchlist/WatchlistFilterChips';
import { WatchlistGridCard } from '../components/watchlist/WatchlistGridCard';
import { WatchlistHeader } from '../components/watchlist/WatchlistHeader';
import { WatchlistPopularSkeletons } from '../components/watchlist/WatchlistPopularSkeletons';
import {
  BECAUSE_SAVED_ITEMS,
  BECAUSE_SAVED_TITLE,
  MOCK_WATCHLIST_UI_EMPTY,
  WATCHLIST_GRID_ITEMS,
  WATCHLIST_KICKER,
} from '../components/watchlist/watchlistMockContent';
import type { WatchlistScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const PLACEHOLDER_DETAIL_ID = 550;

function chunkPairs<T>(items: readonly T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2) as T[]);
  }
  return rows;
}

/**
 * Watchlist UI — toggle `MOCK_WATCHLIST_UI_EMPTY` in `watchlistMockContent.ts` for empty vs populated.
 * No Zustand / AsyncStorage wiring; navigation only for shell testing.
 */
export function WatchlistScreen({ navigation }: WatchlistScreenProps) {
  const insets = useSafeAreaInsets();

  const openDetail = () => {
    navigation.navigate('Detail', {
      id: PLACEHOLDER_DETAIL_ID,
      mediaType: 'movie',
    });
  };

  const goSearchTab = () => {
    navigation.navigate('SearchTab', { screen: 'SearchMain' });
  };

  const goHomeTab = () => {
    navigation.navigate('HomeTab', { screen: 'HomeMain' });
  };

  const gridRows = chunkPairs(WATCHLIST_GRID_ITEMS);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.root}>
        <WatchlistHeader onSearchPress={goSearchTab} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            {
              paddingBottom: insets.bottom + spacing.watchlistScrollBottom,
            },
          ]}
        >
          <View style={styles.page}>
            <WatchlistCollectionHeading
              kicker={WATCHLIST_KICKER}
              title="My Watchlist"
              countLabel={MOCK_WATCHLIST_UI_EMPTY ? '0 titles' : undefined}
            />

            {MOCK_WATCHLIST_UI_EMPTY ? (
              <>
                <WatchlistEmptyState onBrowsePress={goHomeTab} />
                <WatchlistPopularSkeletons />
              </>
            ) : (
              <>
                <WatchlistFilterChips />
                <View style={styles.grid}>
                  {gridRows.map((rowItems, rowIndex) => (
                    <View
                      key={`row-${rowIndex}`}
                      style={[
                        styles.gridRow,
                        rowIndex < gridRows.length - 1 && styles.gridRowSpacing,
                      ]}
                    >
                      {rowItems.map((item) => (
                        <View
                          key={item.id}
                          style={[
                            styles.gridCell,
                            rowItems.length === 1 && styles.gridCellSingle,
                          ]}
                        >
                          <WatchlistGridCard
                            item={item}
                            onDetailsPress={openDetail}
                            onRemovePress={() => undefined}
                          />
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
                <WatchlistBecauseRow
                  title={BECAUSE_SAVED_TITLE}
                  items={BECAUSE_SAVED_ITEMS}
                  onViewAllPress={openDetail}
                  onItemPress={openDetail}
                />
              </>
            )}
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
    paddingHorizontal: spacing.watchlistPagePaddingHorizontal,
    paddingTop: spacing.xs,
  },
  grid: {
    marginBottom: spacing['5xl'],
  },
  gridRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.watchlistGridGap,
  },
  gridRowSpacing: {
    marginBottom: spacing.watchlistGridGap,
  },
  gridCell: {
    flex: 1,
    minWidth: 0,
  },
  gridCellSingle: {
    maxWidth: '50%',
  },
});
