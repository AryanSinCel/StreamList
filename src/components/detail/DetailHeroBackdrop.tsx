import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export interface DetailHeroBackdropProps {
  imageUri: string;
  children?: React.ReactNode;
}

/** Full-bleed hero with bottom fade into `surface` (project-spec §7.3). */
export function DetailHeroBackdrop({
  imageUri,
  children,
}: DetailHeroBackdropProps) {
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
});
