import { TextStyle } from "react-native";

export interface CustomSpacing {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}
export interface CustomFontSize {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}
export interface CustomFontWeight {
  thin: TextStyle['fontWeight'];
  extraLight: TextStyle['fontWeight'];
  light: TextStyle['fontWeight'];
  regular: TextStyle['fontWeight'];
  medium: TextStyle['fontWeight'];
  semiBold: TextStyle['fontWeight'];
  bold: TextStyle['fontWeight'];
  extraBold: TextStyle['fontWeight'];
  black: TextStyle['fontWeight'];
}