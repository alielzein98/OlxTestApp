import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '@constants/Colors';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { spacing } from '@constants/Spacing';
import Text from '@components/Text/Text';

interface Props {
    description?: string,
    t: any
}

export const DescriptionSection: React.FC<Props> = ({ description, t }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('description')}</Text>
        <Text style={styles.sectionText}>
            {description || t('no_description')}
        </Text>
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
    sectionText: {
        fontSize: fontSizes.md,
        color: colors.text.secondary,
        lineHeight: 20,
    },
});