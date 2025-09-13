import React, { FC } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from 'react-native';
import { spacing } from '@constants/Spacing';
import { colors } from '@constants/Colors';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { Text } from '@components';

export interface FullWidthButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

export const FullWidthButton: FC<FullWidthButtonProps> = ({
  title,
  onPress,
  containerStyle,
  buttonStyle,
  textStyle,
  disabled = false,
}) => (
  <View style={[styles.wrapper, containerStyle]}>
    <TouchableOpacity
      style={[styles.addToCartButton, buttonStyle, disabled && {opacity: 0.5}]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[styles.addToCartTxt, textStyle]}>{title}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  addToCartButton: {
    marginBottom: spacing.lg,
    backgroundColor: colors.primary.base,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    alignItems: 'center',
  },
  addToCartTxt: {
    color: colors.primary.white,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semiBold,
  },
});
