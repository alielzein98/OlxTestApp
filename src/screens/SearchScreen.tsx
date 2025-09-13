import {
  FilterSheet,
  FilterTags,
  SearchBar,
} from '@components';
import EmptyState from '@components/EmptyState/EmptyState';
import { AdCard } from '@components/AdCard/AdCard';
import { colors } from '@constants/Colors';
import { fontSizes } from '@constants/Fonts';
import { spacing } from '@constants/Spacing';
import { useBottomSheet } from '@contexts/bottomSheetContext';
import { allProducts } from '@data/mockData';
import { fetchProducts } from '@services/mockApiService';
import { ProductCategory, Routes } from '@types';
import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '@navigation/navigationref';
import i18n from 'src/locales/i18n';
import { useTranslation } from 'react-i18next';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SearchScreen: React.FC = () => {
  const { open, close } = useBottomSheet();
  const [query, setQuery] = useState<string>('');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterValues, setFilterValues] = useState({
    categories: [],
    locations: [],
    priceRange: [0, 60000] as [number, number],
    titleQuery: ''
  });
  const language = i18n.language;
  const { t } = useTranslation();
  const uniqueLocations = useMemo(() => {
    const set = new Set(allProducts.map(p => p.location));
    return Array.from(set);
  }, []);


  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);


  const showFilterInfo = () => {
    open(
      <FilterSheet
        locations={uniqueLocations}
        selectedValues={filterValues}
        onApply={filters => {
          setFilterValues(filters);
          applyFilters(filters);
          close();
        }}
        onClear={() => {
          setFilterValues({
            categories: [],
            locations: [],
            priceRange: [0, 60000],
            titleQuery: ''
          });
          setProducts(allProducts);
          close();
        }}
        language={language}
      />
    );
  };

  const applyFilters = (filters: {
    categories: string[];
    locations: string[];
    priceRange: [number, number];
    titleQuery: string;
  }) => {
    let filtered = [...allProducts];

    if (filters.categories.length > 0) {
      filtered = filtered.filter(p =>
        filters.categories.includes(p.category)
      );
    }
    if (filters.locations.length > 0) {
      filtered = filtered.filter(p =>
        filters.locations.includes(p.location)
      );
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(p => p.price >= min && p.price <= max);
    }
    if (filters.titleQuery.trim() !== '') {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(filters.titleQuery.toLowerCase())
      );
    }
    setProducts(filtered);
  };

  const displayedProducts = useMemo(() => {
    if (!query.trim()) return products;
    return products.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [products, query]);

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {loading ? (
          <ActivityIndicator
            size="large"
            color={colors.primary.base}
            style={{ marginTop: spacing.xl, flex: 1, justifyContent: 'center', alignItems: 'center' }}
          />)
          : (
            <>
              <View style={{
                flexDirection: 'row',
                gap: spacing.xs,
                paddingTop: spacing.md,
                paddingHorizontal: spacing.md,
                paddingBottom: spacing.xxs,
              }}>
                <SearchBar
                  placeholder={t('search')}
                  value={query}
                  language={language}
                  leftIcon="search"
                  style={{ flex: 1 }}
                  onChangeText={setQuery}
                  tint={colors.text.primary}
                  rightIcon={{
                    name: 'filter-list',
                    onPress: () => showFilterInfo()
                  }} />
              </View>
              <View style={{ marginTop: spacing.sm }}>
                <FilterTags
                  filters={filterValues}
                  onRemove={(type, value) => {
                    let updated = { ...filterValues };
                    if (type === "categories") {
                      updated.categories = updated.categories.filter((c) => c !== value);
                    } else if (type === "locations") {
                      updated.locations = updated.locations.filter((l) => l !== value);
                    } else if (type === "priceRange") {
                      updated.priceRange = [0, 60000];
                    } else if (type === "titleQuery") {
                      updated.titleQuery = "";
                    }
                    setFilterValues(updated);
                    applyFilters(updated);
                  }}
                />
              </View>

              <FlatList
                data={displayedProducts}
                keyExtractor={item => item?.id?.toString()}
                numColumns={2}
                contentContainerStyle={{
                  paddingTop: spacing.md,
                  paddingBottom: spacing.xl,
                  paddingHorizontal: spacing.md,
                  gap: spacing.md,
                }}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                }}
                renderItem={({ item }) => {
                  const cardWidth = (SCREEN_WIDTH - spacing.md * 3) / 2;
                  return (
                    <AdCard
                      {...item}
                      language={language}
                      category={item.category as ProductCategory}
                      containerStyle={{ width: cardWidth }}
                      onPress={() => navigate(Routes.AdDetails, { ad: item })}
                    />
                  );
                }}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                  <EmptyState
                    title="No Result Found"
                    titleStyle={{
                      color: colors.gray[700],
                      fontSize: fontSizes.xxl,
                    }}
                    iconProps={{
                      name: 'search',
                      size: 90,
                      color: colors.gray[600],
                    }} />
                )} />
            </>
          )
        }
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.surface,
    paddingTop: StatusBar.currentHeight,
  },
});

export default SearchScreen;
