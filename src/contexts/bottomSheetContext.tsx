import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  useMemo,
} from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { colors } from '@constants/Colors';

type SheetContent = ReactNode;

interface BottomSheetContextValue {
  open: (content: SheetContent) => void;
  close: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextValue>({
  open: () => { },
  close: () => { },
});

export const useBottomSheet = () => useContext(BottomSheetContext);
export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const [content, setContent] = useState<SheetContent>(null);

  const open = (c: SheetContent) => {
    setContent(c);
    sheetRef.current?.present();
  };

  const close = () => {
    sheetRef.current?.close();
  };

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <BottomSheetContext.Provider value={value}>
      {children}

      <BottomSheetModal
        ref={sheetRef}
        backgroundStyle={[{ backgroundColor: colors.background.default }]}
        index={1}
        style={{
          overflow: 'hidden',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          marginBottom: 20,
        }}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.2}
            pressBehavior="close"
          />
        )}
        snapPoints={[1]}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
      >
        {content}
      </BottomSheetModal>
    </BottomSheetContext.Provider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
