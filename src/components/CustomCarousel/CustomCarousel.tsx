import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { colors } from '@constants/Colors';
import { CarouselProps } from '@types';
import { Icon } from '../Icon/Icon';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ITEM_WIDTH = SCREEN_WIDTH * 0.92;
const GAP = 16;
const PAGE_WIDTH = ITEM_WIDTH + GAP;

export const CustomCarousel: React.FC<CarouselProps> = ({
  items,
  imageStyle,
  slideHeight,
  showPagination = false,
  enableModal = true,
  wrapperStyle
}) => {
  const SLIDE_HEIGHT = ITEM_WIDTH * slideHeight;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState(0);
  const openModal = (index: number) => {
    setModalStartIndex(index);
    setModalIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalStartIndex(0);
  };

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <Carousel
        width={PAGE_WIDTH}
        height={SLIDE_HEIGHT}
        data={items}
        onSnapToItem={i => setCurrentIndex(i)}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: ITEM_WIDTH,
              height: SLIDE_HEIGHT,
              marginHorizontal: GAP / 2,
            }}
            onPress={() => {
              if (item.onPress) {
                item.onPress();
              } else if (enableModal) {
                openModal(currentIndex);
              }
            }}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={[
                styles.image,
                { width: ITEM_WIDTH, height: SLIDE_HEIGHT },
                imageStyle,
              ]}
            />
          </TouchableOpacity>
        )}
        loop
        pagingEnabled
        autoPlay={!modalVisible}
        autoPlayInterval={5000}
      />

      {showPagination && (
        <View style={styles.pagination}>
          {items.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, idx === currentIndex && styles.dotActive]}
            />
          ))}
        </View>
      )}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <Carousel
            width={SCREEN_WIDTH}
            height={SCREEN_HEIGHT * 0.9}
            data={items}
            defaultIndex={modalStartIndex}
            onSnapToItem={i => setModalIndex(i)}
            scrollAnimationDuration={250}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.imageUrl }}
                style={[
                  styles.modalImage,
                  { width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.9 },
                ]}
              />
            )}
          />
          <TouchableOpacity style={styles.closeBtn} onPress={closeModal} activeOpacity={0.7}>
            <Icon name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          {showPagination && (
            <View style={styles.modalPagination}>
              {items.map((_, idx) => (
                <View
                  key={idx}
                  style={[styles.dot, idx === modalIndex && styles.dotActive]}
                />
              ))}
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: colors.background.default,
  },
  image: {
    borderRadius: 12,
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray[300],
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.primary.base,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: SCREEN_WIDTH,
    borderRadius: 12,
    resizeMode: 'contain',
  },
  closeBtn: {
    position: 'absolute',
    top: SCREEN_HEIGHT * 0.08,
    right: SCREEN_WIDTH * 0.05,
    height: 35,
    width: 35,
    backgroundColor: colors.primary.white,
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalPagination: {
    position: 'absolute',
    bottom: SCREEN_HEIGHT * 0.05,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
