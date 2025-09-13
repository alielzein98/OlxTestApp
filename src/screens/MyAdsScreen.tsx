import React, { useEffect, useMemo, useState } from 'react';
import {
    StyleSheet,
    StatusBar,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    View,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@constants/Colors';
import { fontSizes } from '@constants/Fonts';
import { spacing } from '@constants/Spacing';
import { FilterSheet, FilterTags, SearchBar } from '@components/index';
import { ProductCategory, Routes } from '@types';
import EmptyState from '@components/EmptyState/EmptyState';
import { useBottomSheet } from '@contexts/bottomSheetContext';
import { allProducts } from '@data/mockData';
import { fetchProducts } from '@services/mockApiService';
import { HorizontalAdCard } from '@components/HorizontalAdCard/HorizontalAdCard';
import { navigate } from '@navigation/navigationref';
import { useTranslation } from 'react-i18next';
import i18n from 'src/locales/i18n';

const MyAdsScreen: React.FC = () => {
    const { open, close } = useBottomSheet();
    const [query, setQuery] = useState<string>('');
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();
    const language = i18n.language
    const [filterValues, setFilterValues] = useState({
        categories: [],
        locations: [],
        priceRange: [0, 60000] as [number, number],
        titleQuery: ''
    });

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
            <StatusBar barStyle="dark-content" backgroundColor={colors.background.surface} />

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
                                    leftIcon="search"
                                    style={{ flex: 1 }}
                                    onChangeText={setQuery}
                                    language={language}
                                    tint={colors.text.primary}
                                    rightIcon={{
                                        name: 'filter-list',
                                        onPress: () => showFilterInfo()
                                    }} />
                            </View>
                            <View style={{ marginTop: spacing.xxs }}>
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
                                contentContainerStyle={{
                                    paddingTop: spacing.md,
                                    paddingBottom: spacing.xl,
                                    paddingHorizontal: spacing.md,
                                    gap: spacing.md
                                }}
                                renderItem={({ item }) => {
                                    return (
                                        <HorizontalAdCard
                                            {...item}
                                            language={language}
                                            category={item.category as ProductCategory}
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
                                        }}
                                    />
                                )}
                            />

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
    },
    guestContainer: {
        flex: 1,
        backgroundColor: colors.background.surface,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    guestTitle: {
        fontSize: fontSizes.xl,
        fontWeight: '600',
        color: colors.text.primary,
        marginBottom: 8,
        textAlign: 'center',
    },
    guestSubtitle: {
        fontSize: fontSizes.md,
        color: colors.text.secondary,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: fontSizes.md * 1.4,
    },
    loginBtn: {
        backgroundColor: colors.primary.base,
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 24,
    },
    loginBtnText: {
        color: colors.primary.white,
        fontSize: fontSizes.md,
        fontWeight: '500',
    },
    tabBar: {
        backgroundColor: colors.background.surface,
        elevation: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: colors.gray[300],
    },
    tabLabel: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        textTransform: 'none',
    },
    indicator: {
        backgroundColor: colors.primary.base,
        height: 3,
        borderRadius: 3,
    },
});

export default MyAdsScreen;