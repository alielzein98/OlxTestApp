import React, { FC } from 'react';
import { View } from 'react-native';
import {
  MaterialIcons,
  Entypo,
  MaterialCommunityIcons,
  Ionicons,
  SimpleLineIcons,
  Octicons,
  FontAwesome6,
  FontAwesome
} from '@expo/vector-icons';
import { colors } from '@constants/Colors';
import { spacing } from '@constants/Spacing';
import { Text } from '@components';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { IconProps } from '@types';
import { ICON_TYPE } from '../../types/enums';

export const Icon: FC<IconProps> = ({
  size = 24,
  color,
  name,
  type,
  showBadge,
  badgeNumber,
  testID,
  containerStyle,
  onPress,
  showBackground,
  family,
  badgeStyle
}) => {
  const svgIconProps = {
    width: size,
    height: size,
    fill: 'currentColor',
    style: { color: color },
  };

  if (!name) return null;

  let children;
  if (type === ICON_TYPE.SVG) {
    // TODO: Add SVG icons implementation
    children = null;
  } else {
    switch (family) {
      case 'Entypo':
        children = (
          <Entypo
            testID={testID}
            size={size}
            color={color ?? colors.text.primary}
            name={name as any}
            style={{ marginLeft: 10 }}
            onPress={onPress}
          />
        );
        break;
      case 'MaterialCommunityIcons':
        children = (
          <MaterialCommunityIcons
            testID={testID}
            size={size}
            color={color ?? colors.text.primary}
            name={name as any}
            onPress={onPress}
          />
        );
        break;
      case 'Ionicons':
        children = (
          <Ionicons
            testID={testID}
            size={size}
            color={color ?? colors.text.primary}
            name={name as any}
            onPress={onPress}
          />
        );
        break;
      case 'SimpleLineIcons':
        children = (
          <SimpleLineIcons
            testID={testID}
            size={size}
            color={color ?? colors.text.primary}
            name={name as any}
            onPress={onPress}
          />
        );
        break;
      case 'Octicons':
        children = (
          <Octicons
            testID={testID}
            size={size}
            color={color ?? colors.text.primary}
            name={name as any}
            onPress={onPress}
          />
        );
        break;
      case 'FontAwesome6':
        children = (
          <FontAwesome6
            testID={testID}
            size={size}
            color={color ?? colors.text.primary}
            name={name}
            onPress={onPress}
          />
        );
        break;
      case 'FontAwesome':
        children = (
          <FontAwesome
            testID={testID}
            size={size}
            color={color ?? colors.text.primary}
            name={name as any}
            onPress={onPress}
          />
        );
        break;
      default:
        children = (
          <MaterialIcons
            testID={testID}
            size={size}
            color={color ?? colors.text.primary}
            name={name as any}
            onPress={onPress}
          />
        );
    }
  }

  return (
    <View>
      {showBadge && (
        <View
          style={[{
            backgroundColor: colors.primary.base,
            width: 18,
            height: 18,
            right: -3,
            zIndex: 10,
            top: -4,
            borderRadius: 99999,
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
          }, badgeStyle]}
        >
          <Text
            style={{
              color: colors.primary.white,
              fontWeight: fontWeights.bold,
              fontSize: fontSizes.xs,
            }}
          >
            {badgeNumber}
          </Text>
        </View>
      )}
      <View
        style={[
          showBackground && {
            backgroundColor: colors.background.default,
            padding: spacing.xs,
            borderRadius: 9999,
            borderColor: colors.background.surface,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          },
          containerStyle,
        ]}
      >
        {children}
      </View>
    </View>
  );
};
