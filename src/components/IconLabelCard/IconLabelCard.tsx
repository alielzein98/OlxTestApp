import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@components';
import { IconLabelCardProps } from '@types';
import { spacing } from '@constants/Spacing';
import { fontSizes, fontWeights } from '@constants/Fonts';
import Image from '../Image/Image';
import FastImage from '@d11/react-native-fast-image';

export const IconLabelCard: React.FC<IconLabelCardProps> = ({
  uri,
  label,
  onPress,
  cardWidth,
  cardHeight,
  textStyle,
  imageStyle,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconWrapper,
          { height: cardWidth, width: cardWidth },
          { height: cardHeight },
        ]}
      >
        <Image
          source={uri}
          style={[
            {
              width: cardWidth,
              height: cardWidth,
              borderRadius: 999999,
            },
            imageStyle,
          ]}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: fontSizes.sm,
    textAlign: 'center',
    flexWrap: 'wrap',
    width: 90,
    fontWeight: fontWeights.medium,
  },
});

export default IconLabelCard;