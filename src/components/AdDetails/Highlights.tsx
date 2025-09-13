import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '@constants/Spacing';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { colors } from '@constants/Colors';
import Text from '@components/Text/Text';

interface HighlightsProps {
    t: any
}
export const Highlights: React.FC<HighlightsProps> = ({ t }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('highlights')}</Text>
        <View style={styles.row}>
            <Text style={styles.tag}>{t('verified_seller')}</Text>
            <Text style={styles.tag}>{t('negotiable')}</Text>
            <Text style={styles.tag}>{t('urgent_sale')}</Text>
        </View>
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
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm
    },
    tag: {
        fontSize: fontSizes.sm,
        color: colors.text.secondary,
        backgroundColor: colors.gray[200],
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
});