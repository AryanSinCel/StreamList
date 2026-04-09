import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { MovieIcon } from '../icons/svgIcons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export interface DetailHeroBackdropProps {
  imageUri: string | null;
  children?: React.ReactNode;
}

/** Full-bleed hero with bottom fade into `surface` (project-spec §7.3). */
export function DetailHeroBackdrop({
  imageUri,
  children,
}: DetailHeroBackdropProps) {
  const hasImage = imageUri != null && imageUri.length > 0;

  if (!hasImage) {
    return (
      <View style={styles.wrap}>
        <View style={[styles.image, styles.placeholder]}>
          <MovieIcon color={colors.on_surface_variant} size={spacing['5xl']} />
        </View>
        <LinearGradient
          colors={['transparent', colors.surface]}
          locations={[0.55, 1]}
          style={StyleSheet.absoluteFill}
        />
        {children}
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <ImageBackground
        accessibilityIgnoresInvertColors
        source={{ uri: imageUri }}
        style={styles.image}
        imageStyle={styles.imageInner}
      >
        <LinearGradient
          colors={['transparent', colors.surface]}
          locations={[0.55, 1]}
          style={StyleSheet.absoluteFill}
        />
        {children}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: spacing.detailHeroHeight,
    backgroundColor: colors.surface_container_high,
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  imageInner: {
    resizeMode: 'cover',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
