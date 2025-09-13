import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Image from '@components/Image/Image';
import { spacing } from '@constants/Spacing';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { colors } from '@constants/Colors';
import Text from '@components/Text/Text';

interface Props {
    ads: any[],
    t: any
};

export const SimilarAds: React.FC<Props> = ({ ads, t }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('similar_ads')}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {ads.map((ad, i) => (
                <View key={i} style={styles.similarAd}>
                    <Image source={ad.imageUrl} style={styles.similarImage} />
                    <Text style={styles.similarTxt} numberOfLines={1}>{ad.title}</Text>
                </View>
            ))}
        </ScrollView>
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
    similarAd: {
        width: 120,
        marginRight: spacing.md
    },
    similarImage: {
        width: 120,
        height: 80,
        borderRadius: 6
    },
    similarTxt: {
        fontSize: fontSizes.sm,
        color: colors.text.primary,
        marginTop: 4
    },
});
