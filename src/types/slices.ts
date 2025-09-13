import { ToastShowParams } from "react-native-toast-message";


export interface AppSliceState {
  appLoaded: boolean;
  toast?: MutableToastParams;

}
export interface MutableToastParams {
  type: ToastShowParams['type'];
  text1?: string;
  text2?: string;
  topOffset?: number;
  text1Style?: any;
  text2Style?: any;
  props?: ToastShowParams['props'];
}