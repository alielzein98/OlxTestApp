import FastImage, { ResizeMode } from '@d11/react-native-fast-image';
import React from 'react';
import { StyleProp, ImageStyle } from 'react-native';

type Props = {
  source: string | number;
  resizeMode?: ResizeMode;
  style?: StyleProp<ImageStyle>;
};

const Image: React.FC<Props> = ({
  source,
  resizeMode = FastImage.resizeMode.cover,
  style,
}) => {
  const imgSource =
    typeof source === 'string'
      ? { uri: source, priority: FastImage.priority.high }
      : source;

  return <FastImage style={style} source={imgSource} resizeMode={resizeMode} />;
};

export default Image;
