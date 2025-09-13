import React from 'react';
import { View, StyleSheet } from 'react-native';
import Image from '@components/Image/Image';
import { spacing } from '@constants/Spacing';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { LocationMapProps } from '@types';
import Text from '@components/Text/Text';

export const LocationMap: React.FC<LocationMapProps> = ({ long, lat, t }) => (
    <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('location')}</Text>
        <Image
            source={'https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg'}
            style={styles.map}
        />
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
        marginBottom: spacing.xs
    },
    map: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
});
