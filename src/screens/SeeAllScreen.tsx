import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import type { MovieListItem } from '../api/types';
import { IconScrimButton } from '../components/common/IconScrimButton';
import { ArrowBackIcon } from '../components/icons/svgIcons';
import { SearchGridPosterCard } from '../components/search/SearchGridPosterCard';
import { useSeeAll } from '../hooks/useSeeAll';
import type { SeeAllScreenProps } from '../navigation/types';
import { colors } from '../theme/colors';
import { radii } from '../theme/radii';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { movieListItemToSearchGridItem } from '../utils/movieDisplay';

const SKELETON_SLOTS = 8;
const LIST_END_REACHED_THRESHOLD = 0.5;

function chunkPairs<T>(items: readonly T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2) as T[]);
  }
  return rows;
}

function SeeAllGridSkeleton() {
  const opacity = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.85,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.45,
          duration: 700,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  const slots = useMemo(
    () => Array.from({ length: SKELETON_SLOTS }, (_, i) => i),
    [],
  );
  const rows = useMemo(() => chunkPairs(slots), [slots]);

  return (
    <View style={styles.skeletonOuter}>
      {rows.map((row, ri) => (
        <View key={`sk-${ri}`} style={styles.gridRow}>
          {row.map((i) => (
            <View key={i} style={styles.gridCell}>
              <Animated.View
                style={[styles.skeletonPoster, { opacity }]}
              />
              <Animated.View style={[styles.skeletonLine, { opacity }]} />
              <Animated.View
                style={[styles.skeletonLine, styles.skeletonLineShort, { opacity }]}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function SeeAllLoadMoreFooter({ visible }: { visible: boolean }) {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.footerWrap}>
      <Text style={styles.footerLabel}>LOADING MORE CONTENT</Text>
    </View>
  );
}

export function SeeAllScreen({ navigation, route }: SeeAllScreenProps) {
  const insets = useSafeAreaInsets();
  const { title, type, genreId, movieId } = route.params;

  const { data, loading, error, refetch, loadMore, hasMore, loadingMore, genreMap } =
    useSeeAll({ type, genreId, movieId });

  const openDetail = useCallback(
    (detailMovieId: number) => {
      navigation.navigate('Detail', { id: detailMovieId, mediaType: 'movie' });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: MovieListItem }) => (
      <View style={styles.gridCell}>
        <SearchGridPosterCard
          item={movieListItemToSearchGridItem(item, genreMap)}
          onPress={() => openDetail(item.id)}
        />
      </View>
    ),
    [genreMap, openDetail],
  );

  const keyExtractor = useCallback((item: MovieListItem) => String(item.id), []);

  const onEndReached = useCallback(() => {
    if (hasMore && !loadingMore && !loading) {
      loadMore();
    }
  }, [hasMore, loadingMore, loading, loadMore]);

  const listData = data ?? [];

  const showSkeleton = loading && data === null;
  const showEmpty =
    !loading && !error && data !== null && listData.length === 0;
  const showError = Boolean(error);
  const showGrid = !showSkeleton && !showError && !showEmpty && listData.length > 0;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.headerRow}>
        <IconScrimButton
          accessibilityLabel="Go back"
          onPress={() => navigation.goBack()}
        >
          <ArrowBackIcon color={colors.on_surface} size={spacing.iconMd} />
        </IconScrimButton>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <View style={styles.body}>
        {showError ? (
          <View style={styles.centerBlock}>
            <Text style={styles.errorText}>{error}</Text>
            <Pressable onPress={refetch} accessibilityRole="button">
              <Text style={styles.retry}>Retry</Text>
            </Pressable>
          </View>
        ) : null}

        {showSkeleton ? (
          <View style={styles.page}>
            <SeeAllGridSkeleton />
          </View>
        ) : null}

        {showEmpty ? (
          <View style={styles.centerBlock}>
            <Text style={styles.emptyText}>No content available</Text>
          </View>
        ) : null}

        {showGrid ? (
          <FlatList
            style={styles.list}
            data={listData}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.gridRow}
            contentContainerStyle={[
              styles.listContent,
              { paddingBottom: insets.bottom + spacing['5xl'] },
            ]}
            onEndReached={onEndReached}
            onEndReachedThreshold={LIST_END_REACHED_THRESHOLD}
            ListFooterComponent={
              <SeeAllLoadMoreFooter
                visible={loadingMore && listData.length > 0}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.searchPagePaddingHorizontal,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  headerTitle: {
    ...typography['headline-md'],
    color: colors.on_surface,
    flex: 1,
  },
  headerSpacer: {
    width: spacing.detailIconButton,
  },
  body: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  page: {
    paddingHorizontal: spacing.searchPagePaddingHorizontal,
    paddingTop: spacing.sm,
  },
  listContent: {
    paddingHorizontal: spacing.searchPagePaddingHorizontal,
    paddingTop: spacing.sm,
    flexGrow: 1,
  },
  gridRow: {
    flexDirection: 'row',
    gap: spacing.searchGridGap,
    marginBottom: spacing.searchGridGap,
  },
  gridCell: {
    flex: 1,
    minWidth: 0,
  },
  centerBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing['3xl'],
    width: '100%',
  },
  errorText: {
    ...typography['body-md'],
    color: colors.on_surface_variant,
    textAlign: 'center',
  },
  retry: {
    ...typography['title-sm'],
    color: colors.primary_container,
    marginTop: spacing.md,
  },
  emptyText: {
    ...typography['body-md'],
    color: colors.on_surface_variant,
    textAlign: 'center',
  },
  skeletonOuter: {
    gap: spacing.searchGridGap,
  },
  skeletonPoster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: radii.lg,
    backgroundColor: colors.surface_container_highest,
    marginBottom: spacing.sm,
  },
  skeletonLine: {
    height: spacing.sm,
    borderRadius: radii.sm,
    backgroundColor: colors.surface_container_highest,
    marginBottom: spacing.xxs,
  },
  skeletonLineShort: {
    width: '70%',
  },
  footerWrap: {
    paddingVertical: spacing['3xl'],
    alignItems: 'center',
  },
  footerLabel: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
    textTransform: 'uppercase',
    letterSpacing: spacing.xxs,
    fontWeight: '700',
    opacity: 0.55,
  },
});
