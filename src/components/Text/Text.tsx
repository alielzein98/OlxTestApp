import { colors } from '@constants/Colors';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';

export type TextProps = RNTextProps;

export const Text: React.FC<TextProps> = ({ children, ...rest }) => (
  <RNText style={{color: colors.text.primary}} {...rest}>{children}</RNText>
);

export default Text;
