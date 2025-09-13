import { Icon } from '@components';
import { colors } from '@constants/Colors';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { spacing } from '@constants/Spacing';
import { EmptyStateProps } from '@types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  subtitle,
  containerStyle,
  titleStyle,
  subtitleStyle,
  iconProps,
}) => (
  <View style={[styles.container, containerStyle]}>
    <Icon
      name={iconProps?.name}
      color={iconProps?.color}
      size={iconProps?.size}
      type={iconProps?.type}
      family={iconProps?.family}
    />
    <View style={{ gap: spacing.md }}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      {subtitle && (
        <Text style={[styles.subtitle, subtitleStyle]}>{subtitle}</Text>
      )}
    </View>
  </View>
);

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
    marginBottom: spacing.xxxl, //this to make it fell more centered
  },
  image: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.medium,
    color: colors.text.primary,
    textAlign: 'center',
  },
});
