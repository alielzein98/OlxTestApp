import React, { useMemo, useState } from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    TextInput,
    ScrollView,
} from 'react-native';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { colors } from '@constants/Colors';
import { spacing } from '@constants/Spacing';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { categories } from '@data/mockData';
import { FilterSection } from '@components/FilterSection/FilterSection';
import { CheckboxItem } from '@components/CheckBoxItem/CheckBoxItem';
import { useTranslation } from 'react-i18next';
import { FilterSheetProps } from '@types';
import Text from '@components/Text/Text';

const { height } = Dimensions.get('window');

export const FilterSheet: React.FC<FilterSheetProps> = ({
    onApply,
    onClear,
    locations,
    language,
    selectedValues
}) => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>(selectedValues.categories);
    const [selectedLocations, setSelectedLocations] = useState<string[]>(selectedValues.locations);
    const [priceRange, setPriceRange] = useState<[number, number]>(selectedValues.priceRange);
    const [titleQuery, setTitleQuery] = useState<string>(selectedValues.titleQuery);
    const { t } = useTranslation();
    const toggleCategory = (name: string) => {
        setSelectedCategories(prev =>
            prev.includes(name) ? prev.filter(c => c !== name) : [...prev, name]
        );
    };

    const toggleLocation = (loc: string) => {
        setSelectedLocations(prev =>
            prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
        );
    };

    const applyFilters = () => {
        onApply?.({
            categories: selectedCategories,
            locations: selectedLocations,
            priceRange,
            titleQuery,
        });
    };

    return (
        <BottomSheetView style={styles.sheet}>
            <View style={styles.header}>
                <Text style={styles.title}>{t('filter')}</Text>
                <TouchableOpacity onPress={onClear}>
                    <Text style={styles.clearTxt}>{t('clear_all')}</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ gap: spacing.lg }}
                showsVerticalScrollIndicator={false}
            >
                <FilterSection title={t('category')} language={language}>
                    {categories.data.map(cat => (
                        <CheckboxItem
                            key={cat.id}
                            label={cat.name}
                            checked={selectedCategories.includes(cat.key)}
                            onPress={() => toggleCategory(cat.key)}
                        />
                    ))}
                </FilterSection>

                <FilterSection title={t('location')} language={language}>
                    {locations.map(loc => (
                        <CheckboxItem
                            key={loc}
                            label={loc}
                            checked={selectedLocations.includes(loc)}
                            onPress={() => toggleLocation(loc)}
                        />
                    ))}
                </FilterSection>
                <FilterSection title={t('price')} language={language}>
                    <View style={styles.priceRow}>
                        <TextInput
                            style={styles.priceInput}
                            keyboardType="numeric"
                            placeholder={t('min')}
                            value={priceRange[0].toString()}
                            onChangeText={val => setPriceRange([Number(val) || 0, priceRange[1]])}
                        />
                        <Text style={{ fontSize: fontSizes.md }}> - </Text>
                        <TextInput
                            style={styles.priceInput}
                            keyboardType="numeric"
                            placeholder={t('max')}
                            value={priceRange[1].toString()}
                            onChangeText={val => setPriceRange([priceRange[0], Number(val) || 0])}
                        />
                    </View>
                </FilterSection>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
                    <Text style={styles.applyTxt}>{t('apply_filters')}</Text>
                </TouchableOpacity>
            </View>
        </BottomSheetView>
    );
};


const styles = StyleSheet.create({
    sheet: {
        flex: 1,
        padding: spacing.md,
        gap: spacing.md,
        maxHeight: height * 0.7,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    clearTxt: {
        fontSize: fontSizes.sm,
        color: colors.secondary.base,
        fontWeight: fontWeights.medium,
    },
    title: {
        fontSize: fontSizes.xl,
        fontWeight: fontWeights.semiBold,
    },
    sectionTitle: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.medium,
        color: colors.text.primary,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.xs,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: colors.gray[400],
        backgroundColor: colors.background.surface,
    },
    checkboxChecked: {
        backgroundColor: colors.primary.base,
        borderColor: colors.primary.base,
    },
    checkboxLabel: {
        fontSize: fontSizes.sm,
        color: colors.text.primary,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    priceInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.gray[400],
        borderRadius: 6,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        fontSize: fontSizes.sm,
    },
    textInput: {
        borderWidth: 1,
        borderColor: colors.gray[400],
        borderRadius: 6,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        fontSize: fontSizes.sm,
    },
    footer: {
        paddingVertical: spacing.md,
    },
    applyBtn: {
        backgroundColor: colors.primary.base,
        paddingVertical: spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    applyTxt: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.semiBold,
        color: colors.primary.white,
    },
});