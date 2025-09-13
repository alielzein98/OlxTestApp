import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import {
  CustomCarousel,
  GlobalHeader,
  SectionList,
  IconLabelCard
} from '@components';
import { colors } from '@constants/Colors';
import { spacing } from '@constants/Spacing';
import { fontSizes } from '@constants/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { AdCard } from '@components/AdCard/AdCard';
import { ProductCategory, Routes } from '@types';
import { fetchApartments, fetchCars, fetchCategories, fetchMobiles } from '@services/mockApiService';
import { navigate } from '@navigation/navigationref';
import i18n from 'src/locales/i18n';

const { width } = Dimensions.get('window');

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const categoryCardWidth = (width - spacing.md * 3) / 4.6;
  const productCardWidth = (width - spacing.md * 2) / 1.5;
  const [apartments, setApartments] = useState<any[]>([]);
  const [cars, setCars] = useState<any[]>([]);
  const [mobiles, setMobiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ data: any[] }>({ data: [] });
  const language = i18n.language;
  useEffect(() => {
    Promise.all([fetchApartments(), fetchCars(), fetchMobiles(), fetchCategories()])
      .then(([apartments, cars, mobiles, categories]) => {
        setApartments(apartments);
        setCars(cars);
        setMobiles(mobiles);
        setCategories(categories)
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <GlobalHeader
        title={t('welcome_text')}
        containerStyle={{ paddingHorizontal: spacing.md }}
        rightActions={[
          {
            name: 'search',
            size: 24,
            onPress: () => console.log('Search pressed'),
          },
        ]}
      />
      {loading ? (
        <ActivityIndicator
          size="large"
          color={colors.primary.base}
          style={{ marginTop: spacing.xl, flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{ gap: spacing.xl, paddingTop: spacing.md }}
          showsVerticalScrollIndicator={false}
        >
          <CustomCarousel
            items={[
              {
                imageUrl:
                  'https://cdn.prod.website-files.com/614b3e8cafbd9789234c277e/683db99149b825fdcd58d8a8_Facebook%20ad%20examples%20blog%20header.jpg',
                onPress: () => console.log('Slide 1 tapped'),
              },
              {
                imageUrl:
                  'https://insight.freakout.net/wp-content/uploads/2021/03/Insight_Richmedia_r1.png',
                onPress: () => console.log('Slide 2 tapped'),
              },
            ]}
            slideHeight={0.5}
            wrapperStyle={{ backgroundColor: colors.background.surface }}
          />
          <SectionList
            title={t('all_categories')}
            data={categories?.data ?? []}
            keyExtractor={category => category.id.toString()}
            renderItem={({ item }) => (
              <IconLabelCard
                uri={item?.images[0]?.thumb_plus_url}
                cardWidth={categoryCardWidth}
                label={item?.name}
                onPress={() =>
                  console.log('Category pressed:', item.name)
                }
              />
            )}
          />
          <SectionList
            title={t('apartments_and_villas_text')}
            data={apartments ?? []}
            contentContainerStyle={{ gap: spacing.md, paddingLeft: spacing.md }}
            keyExtractor={product => product.id.toString()}
            onSeeAll={() => console.log('See All pressed')}
            renderItem={({ item }) => (
              <AdCard
                {...item}
                language={language}
                category={item.category as ProductCategory}
                containerStyle={{ width: productCardWidth }}
                onPress={() => navigate(Routes.AdDetails, { ad: item })}
              />
            )}
          />
          <SectionList
            title={t('cars_for_sale_text')}
            data={cars ?? []}
            contentContainerStyle={{ gap: spacing.md, paddingLeft: spacing.md }}
            keyExtractor={product => product.id.toString()}
            onSeeAll={() => console.log('See All pressed')}
            renderItem={({ item }) => (
              <AdCard
                {...item}
                category={item.category as ProductCategory}
                language={language}
                containerStyle={{ width: productCardWidth }}
                onPress={() => navigate(Routes.AdDetails, { ad: item })}
              />
            )}
          />
          <SectionList
            title={t('mobiles_for_sale_text')}
            data={mobiles ?? []}
            contentContainerStyle={{ gap: spacing.md, paddingLeft: spacing.md }}
            keyExtractor={product => product.id.toString()}
            onSeeAll={() => console.log('See All pressed')}
            renderItem={({ item }) => (
              <AdCard
                {...item}
                language={language}
                category={item.category as ProductCategory}
                containerStyle={{ width: productCardWidth }}
                onPress={() => navigate(Routes.AdDetails, { ad: item })}
              />
            )}
          />
        </ScrollView>
      )}
    </SafeAreaView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.surface,
    paddingBottom: 20
  },
  title: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrap: {
    position: 'relative',
    maxWidth: width * 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupImage: {
    width: width * 0.9,
    height: width * 0.9,
    borderRadius: 8,
  },
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: colors.primary.white,
    borderRadius: 999999,
    padding: spacing.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
