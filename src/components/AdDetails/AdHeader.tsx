import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Text } from '@components';
import { colors } from '@constants/Colors';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { spacing } from '@constants/Spacing';
import { AdHeaderProps } from '@types';

export const AdHeader: React.FC<AdHeaderProps> = ({ price, currency, period, onLike }) => (
    <View style={styles.headerRow}>
        <Text style={styles.price}>
            {currency} {price}{' '}
            {period && <Text style={styles.period}>{period}</Text>}
        </Text>
        <TouchableOpacity style={styles.heartBtn} onPress={onLike}>
            <Icon
                name="heart-outline"
                family="MaterialCommunityIcons"
                size={22}
                color={colors.primary.white}
            />
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        fontSize: fontSizes.xl,
        fontWeight: fontWeights.bold,
        color: colors.semantic.error,
    },
    period: {
        fontSize: fontSizes.md,
        color: colors.text.secondary
    },
    heartBtn: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: spacing.xs,
    },
});
