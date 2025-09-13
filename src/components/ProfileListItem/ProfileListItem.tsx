import React from 'react';
import { ProfileListItemProps } from '@types';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from '../Icon/Icon';
import { spacing } from '@constants/Spacing';
import { colors } from '@constants/Colors';
import Text from '../Text/Text';
import { fontSizes } from '@constants/Fonts';

export const ProfileListItem: React.FC<ProfileListItemProps> = ({
  label,
  icon,
  textColor,
  showRightArrow,
  language,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.itemRow}
      onPress={onPress}
    >
      <View style={styles.rowLeft}>
        <Icon
          size={20}
          color={colors.primary.base}
          containerStyle={{ marginRight: spacing.sm, padding: spacing.xs }}
          {...icon}
        />
        <Text style={[styles.itemLabel, textColor && { color: textColor }]}>
          {label}
        </Text>
      </View>
      {showRightArrow && (
        <Icon
          name={language === 'ar' ? 'chevron-left' : 'chevron-right'}
          family="MaterialIcons"
          size={22}
          color={colors.gray[500]}
        />
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLabel: {
    fontSize: fontSizes.md,
    color: colors.text.primary,
  },
});
