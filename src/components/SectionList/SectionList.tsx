import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@components';
import { spacing } from '@constants/Spacing';
import { colors } from '@constants/Colors';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { SectionListProps } from '@types';
import { useTranslation } from 'react-i18next';

export const SectionList = <ItemT,>({
  title,
  data,
  onSeeAll,
  renderItem,
  keyExtractor,
  contentContainerStyle,
}: SectionListProps<ItemT>) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      {!!title && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {onSeeAll && (
            <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
              <Text style={styles.seeAll}>{t('see_all')}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        horizontal
        data={data}
        renderItem={({ item, index }) => renderItem({ item, index })}
        keyExtractor={keyExtractor ?? ((_, i) => i.toString())}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          { paddingHorizontal: spacing.sm },
          contentContainerStyle,
        ]}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
  },
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
  },
  seeAll: {
    fontSize: fontSizes.sm,
    color: colors.primary.base,
    fontWeight: fontWeights.medium,
  },
});

export default SectionList;
