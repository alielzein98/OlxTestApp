import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '@constants/Spacing';
import { fontSizes } from '@constants/Fonts';
import { colors } from '@constants/Colors';
import Text from '@components/Text/Text';

type AmenitiesProps = {
    t: any
};

export const Amenities: React.FC<AmenitiesProps> = ({ t }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('amenities')}</Text>
        <View style={styles.row}>
            <Text style={styles.amenity}>{t('elevator')}</Text>
            <Text style={styles.amenity}>{t('parking')}</Text>
            <Text style={styles.amenity}>{t('balcony')}</Text>
            <Text style={styles.amenity}>{t('security')}</Text>
            <Text style={styles.amenity}>{t('swimming_pool')}</Text>
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
        fontWeight: '600',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm
    },
    amenity: {
        fontSize: fontSizes.sm,
        color: colors.text.secondary,
        backgroundColor: colors.gray[200],
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
    },
});
