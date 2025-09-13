import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Text, Icon } from '@components';
import { HeaderProps } from '@types';
import { spacing } from '@constants/Spacing';
import { fontSizes, fontWeights } from '@constants/Fonts';

export const GlobalHeader: React.FC<HeaderProps> = ({
  title,
  leftAction,
  rightActions = [],
  containerStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.md }}
      >
        {leftAction && (
          <TouchableOpacity onPress={leftAction.onPress} activeOpacity={0.7}>
            <Icon
              name={leftAction.name}
              size={leftAction.size}
              containerStyle={
                leftAction.name == 'arrow-back-ios' &&
                Platform.OS == 'ios' && {
                  paddingLeft: spacing.md - 1,
                  paddingVertical: spacing.xs + 2,
                }
              }
              showBackground
            />
          </TouchableOpacity>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      {rightActions.length > 0 && (
        <View style={styles.rightContainer}>
          {rightActions.map((action, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={action.onPress}
              activeOpacity={0.7}
            >
              <Icon
                name={action.name}
                showBackground
                size={action.size}
                showBadge={action.showBadge}
                badgeNumber={action.badgeNumber}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.xs,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: fontWeights.bold,
  },
  rightContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
});
