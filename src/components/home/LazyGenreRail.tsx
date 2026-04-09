import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ContentRow } from './ContentRow';
import type { HomeRowState } from '../../hooks/useHome';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { movieListItemToPosterItem } from '../../utils/movieDisplay';

/** Prefetch window (px) before a rail enters the viewport. */
const VIEWPORT_PREFETCH_PX = 320;

export interface LazyGenreRailProps {
  title: string;
  scrollY: number;
  viewportHeight: number;
  genreMap: ReadonlyMap<number, string>;
  rowState: HomeRowState | undefined;
  onRequestLoad: () => void;
  onLoadMore: () => void;
  onRetry: () => void;
  onItemPress: (numericId: number) => void;
  onSeeAllPress: () => void;
}

/**
 * Genre discover rail: requests the first TMDB page only when this row is near the viewport.
 */
export function LazyGenreRail({
  title,
  scrollY,
  viewportHeight,
  genreMap,
  rowState,
  onRequestLoad,
  onLoadMore,
  onRetry,
  onItemPress,
  onSeeAllPress,
}: LazyGenreRailProps) {
  const [layout, setLayout] = useState<{
    y: number;
    height: number;
  } | null>(null);
  const loadRequestedRef = useRef(false);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const { y, height } = e.nativeEvent.layout;
    setLayout({ y, height });
  }, []);

  useEffect(() => {
    if (loadRequestedRef.current || layout == null) {
      return;
    }
    const { y, height } = layout;
    if (height <= 0) {
      return;
    }
    const viewBottom = scrollY + viewportHeight;
    const nearOrInView =
      y + height > scrollY - VIEWPORT_PREFETCH_PX &&
      y < viewBottom + VIEWPORT_PREFETCH_PX;
    if (nearOrInView) {
      loadRequestedRef.current = true;
      onRequestLoad();
    }
  }, [scrollY, viewportHeight, layout, onRequestLoad]);

  const posters = useMemo(
    () =>
      (rowState?.items ?? []).map((m) =>
        movieListItemToPosterItem(m, genreMap),
      ),
    [rowState?.items, genreMap],
  );

  return (
    <View onLayout={onLayout}>
      {rowState?.error ? (
        <View style={styles.rowErr}>
          <Text style={styles.errText}>{rowState.error}</Text>
          <Pressable
            accessibilityRole="button"
            onPress={onRetry}
            hitSlop={spacing.sm}
          >
            <Text style={styles.retry}>Retry</Text>
          </Pressable>
        </View>
      ) : null}
      <ContentRow
        title={title}
        items={posters}
        loading={Boolean(rowState?.loading && posters.length === 0)}
        marginBottom={spacing['9xl']}
        onSeeAllPress={onSeeAllPress}
        onItemPress={(item) => onItemPress(item.numericId)}
        onNearEnd={posters.length > 0 ? onLoadMore : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowErr: {
    paddingHorizontal: spacing['3xl'],
    marginBottom: spacing.sm,
  },
  errText: {
    ...typography['label-sm'],
    color: colors.on_surface_variant,
  },
  retry: {
    ...typography['title-sm'],
    color: colors.primary_container,
    marginTop: spacing.sm,
  },
});
