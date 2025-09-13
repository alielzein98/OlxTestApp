import { colors } from '@constants/Colors';
import { spacing } from '@constants/Spacing';
import { SearchBarProps } from '@types';
import React, { FC } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from '@components';

export const SearchBar: FC<SearchBarProps> = ({
  value,
  leftIcon,
  rightIcon,
  language,
  onChangeText,
  placeholder = 'Search…',
  tint = '#8E8E93',
  style,
  ...rest
}) => {
  return (
    <View style={[styles.container, style]}>
      <Icon
        name={leftIcon}
        size={20}
        color={tint}
        containerStyle={styles.icon} 
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.gray[600]}
        style={[styles.input, {
          color: tint,
          textAlign: language === 'ar' ? 'right' : 'left'
        }]}
        returnKeyType="search"
        clearButtonMode="while-editing"
        {...rest}
      />
      <TouchableOpacity onPress={rightIcon?.onPress} activeOpacity={0.7}>
        <Icon
          name={rightIcon?.name || ''}
          size={20}
          color={tint}
          containerStyle={styles.icon}
          showBadge={rightIcon?.showBadge}
          badgeStyle={{ width: 12, height: 12, right: 4 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    borderRadius: 99,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.default,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    fontSize: 16,
    flex: 1,
  },
});
