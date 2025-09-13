import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Icon } from '@components';
import { colors } from '@constants/Colors';
import { spacing } from '@constants/Spacing';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { ProductCardProps } from '@types';
import Image from '../Image/Image';
import FastImage from '@d11/react-native-fast-image';
import { timeAgo, timeAgoAr } from '@services/dateTimeService';

export const AdCard: React.FC<ProductCardProps> = props => {
    const {
        category,
        imageUrl,
        price,
        period,
        title,
        location,
        date,
        containerStyle,
        onPress,
        beds,
        baths,
        area,
        mileage,
        fuel,
        transmission,
        brand,
        condition,
        currency,
        language
    } = props;
    const renderFeatures = () => {
        if (category === 'apartment') {
            return (
                <View style={styles.featuresRow}>
                    <View style={styles.feature}>
                        <Icon name="bed-outline" family="MaterialCommunityIcons" size={16} color={colors.text.secondary} />
                        <Text style={styles.featureTxt}>{beds}</Text>
                    </View>
                    <View style={styles.feature}>
                        <Icon name="shower" family="MaterialCommunityIcons" size={16} color={colors.text.secondary} />
                        <Text style={styles.featureTxt}>{baths}</Text>
                    </View>
                    <View style={styles.feature}>
                        <Icon name="square-outline" family="Ionicons" size={16} color={colors.text.secondary} />
                        <Text style={styles.featureTxt}>{area} m²</Text>
                    </View>
                </View>
            );
        }
        if (category === 'car') {
            return (
                <View style={styles.featuresRow}>
                    <Text style={styles.featureTxt}>{mileage}</Text>
                    <Text style={styles.featureTxt}>{fuel}</Text>
                    <Text style={styles.featureTxt}>{transmission}</Text>
                </View>
            );
        }
        if (category === 'mobile') {
            return (
                <View style={styles.featuresRow}>
                    <Text style={styles.featureTxt}>{brand}</Text>
                    <Text style={styles.featureTxt}>{condition}</Text>
                </View>
            );
        }
        return null;
    };
    return (
        <TouchableOpacity
            style={[styles.container, containerStyle]}
            activeOpacity={0.7}
            onPress={onPress}
        >
            <View style={styles.imageWrapper}>
                <Image source={imageUrl} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
                <TouchableOpacity style={styles.heartBtn}>
                    <Icon name="heart-outline" family="MaterialCommunityIcons" size={20} color={colors.primary.white} />
                </TouchableOpacity>
            </View>
            <View style={[styles.content, { alignItems: 'flex-start' }]}>
                <Text style={[styles.price]} >
                    {currency || 'USD'} {price} {period && <Text style={styles.period}>{period}</Text>}
                </Text>
                <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                    {title}
                </Text>
                {renderFeatures()}
                <Text style={[styles.location]}>{location}</Text>
                <Text style={[styles.date]}>{language === 'ar' ? timeAgoAr(date) : timeAgo(date)}</Text>
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background.default,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 0.2
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
        height: 130,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    heartBtn: {
        position: 'absolute',
        right: spacing.xxs,
        top: spacing.xxs,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: spacing.xs,
    },
    content: {
        padding: spacing.xs,
        gap: spacing.xs,
    },
    price: {
        fontSize: fontSizes.lg,
        fontWeight: fontWeights.bold,
        color: colors.semantic.error, // red
    },
    period: {
        fontSize: fontSizes.sm,
        fontWeight: fontWeights.regular,
        color: colors.text.secondary,
    },
    title: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.semiBold,
        color: colors.text.primary,
    },
    featuresRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    feature: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xxs,
    },
    featureTxt: {
        fontSize: fontSizes.sm,
        color: colors.text.secondary,
    },
    location: {
        fontSize: fontSizes.sm,
        color: colors.text.primary,
    },
    date: {
        fontSize: fontSizes.xs,
        color: colors.text.secondary,
    },
});