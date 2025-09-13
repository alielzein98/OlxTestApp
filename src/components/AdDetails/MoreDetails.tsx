import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '@constants/Spacing';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { colors } from '@constants/Colors';
import { MoreDetailsProps } from '@types';
import Text from '@components/Text/Text';


export const MoreDetails: React.FC<MoreDetailsProps> = ({ category, ad, t }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('more_details')}</Text>
        {category === 'apartment' && (
            <>
                <Text style={styles.detailItem}>{t('floor')}: {ad.floor || 'N/A'}</Text>
                <Text style={styles.detailItem}>{t('furnished')}: {ad.furnished ? t('yes') : t('no')}</Text>
                <Text style={styles.detailItem}>{t('parking')}: {ad.parking || t('available')}</Text>
            </>
        )}
        {category === 'car' && (
            <>
                <Text style={styles.detailItem}>{t('year')}: {ad.year || 'N/A'}</Text>
                <Text style={styles.detailItem}>{t('condition')}: {ad.condition || 'Used'}</Text>
                <Text style={styles.detailItem}>{t('color')}: {ad.color || 'Black'}</Text>
            </>
        )}
        {category === 'mobile' && (
            <>
                <Text style={styles.detailItem}>{t('storage')}: {ad.storage || 'N/A'}</Text>
                <Text style={styles.detailItem}>{t('condition')}: {ad.condition || 'Used'}</Text>
                <Text style={styles.detailItem}>{t('warranty')}: {ad.warranty || 'No'}</Text>
            </>
        )}
    </View>
);

const styles = StyleSheet.create({
    section: {
        gap: spacing.xxs,
        alignItems: 'flex-start',
    },
    sectionTitle: {
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.semiBold,
    },
    detailItem: {
        fontSize: fontSizes.md,
        color: colors.text.primary,
    },
});
