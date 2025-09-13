import React, { useEffect, useState } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { colors } from '@constants/Colors';
import { spacing } from '@constants/Spacing';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { Icon } from '@components';
import { CustomInputProps } from '@types';

export const CustomTextInput: React.FC<CustomInputProps> = ({
  label,
  error,
  secureTextEntry,
  leftIcon,
  rightIcon,
  containerStyle,
  onRightIconPress,
  language,
  style,
  ...rest
}) => {
  const [hidden, setHidden] = useState(secureTextEntry);

  const toggleSecure = () => {
    if (secureTextEntry) setHidden(h => !h);
    if (onRightIconPress) onRightIconPress();
  };
  useEffect(() => {
    setHidden(secureTextEntry);
  }, [secureTextEntry]);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={[styles.label, { textAlign: 'left' }]}>{label}</Text>}
      <View
        style={[
          styles.fieldRow,
          { borderColor: error ? colors.semantic.error : colors.gray[300] },
        ]}
      >
        {leftIcon && (
          <Icon
            size={20}
            containerStyle={{ marginRight: spacing.sm }}
            color={colors.gray[500]}
            {...leftIcon}
          />
        )}

        <TextInput
          style={[styles.input,
          { textAlign: language === 'ar' ? 'right' : 'left' }
          ]}
          placeholderTextColor={colors.text.placeholder}
          secureTextEntry={hidden}

          {...rest}
        />

        {secureTextEntry ? (
          <Icon
            name={hidden ? 'visibility-off' : 'visibility'}
            family="MaterialIcons"
            size={20}
            color={colors.gray[500]}
            onPress={toggleSecure}
          />
        ) : (
          rightIcon && (
            <Icon
              {...rightIcon}
              size={20}
              color={colors.gray[500]}
              onPress={toggleSecure}
            />
          )
        )}
      </View>
      {error && <Text style={styles.errorTxt}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: '100%', gap: spacing.xs },
  label: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    fontWeight: fontWeights.semiBold,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.default,
    height: 48,
  },
  input: {
    flex: 1,
    fontSize: fontSizes.md,
    color: colors.text.primary,
  },
  errorTxt: {
    fontSize: fontSizes.xs,
    color: colors.semantic.error,
    marginLeft: spacing.xxs,
  },
});
