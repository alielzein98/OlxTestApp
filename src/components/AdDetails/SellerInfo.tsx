import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '@constants/Colors';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { spacing } from '@constants/Spacing';
import Image from '@components/Image/Image';
import { SellerInfoProps } from '@types';
import Text from '@components/Text/Text';

export const SellerInfo: React.FC<SellerInfoProps> = ({ sellerName, sellerAvatar, t }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('seller_info')}</Text>
        <View style={styles.sellerRow}>
            <Image
                source={sellerAvatar}
                style={styles.sellerAvatar}
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.sellerName}>{sellerName}</Text>
                <Text style={styles.sellerMeta}>{t('member_since')}: 2022</Text>
                <Text style={styles.sellerMeta}>{t('ads_posted')}: 12</Text>
            </View>
            <TouchableOpacity style={styles.viewAdsBtn}>
                <Text style={styles.viewAdsTxt}>{t('view_ads')}</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    section: {
        gap: spacing.md,
        alignItems: 'flex-start'
    },
    sectionTitle: {
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.semiBold
    },
    sellerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md
    },
    sellerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    sellerName: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.semiBold
    },
    sellerMeta: {
        fontSize: fontSizes.sm,
        color: colors.text.secondary
    },
    viewAdsBtn: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: colors.primary.base,
        borderRadius: 6,
    },
    viewAdsTxt: {
        fontSize: fontSizes.sm,
        color: colors.primary.base
    },
});
