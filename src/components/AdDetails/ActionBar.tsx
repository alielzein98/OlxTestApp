import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon, Text } from '@components';
import { colors } from '@constants/Colors';
import { spacing } from '@constants/Spacing';
import { fontSizes, fontWeights } from '@constants/Fonts';

export const ActionBar = () => (
    <View style={styles.actionBar}>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#25D366' }]}>
            <Icon name="logo-whatsapp" family="Ionicons" size={20} color={colors.primary.white} />
            <Text style={styles.actionTxt}>WhatsApp</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.primary.base }]}>
            <Icon name="chatbubble-ellipses-outline" family="Ionicons" size={20} color={colors.primary.white} />
            <Text style={styles.actionTxt}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { backgroundColor: colors.semantic.error }]}>
            <Icon name="call-outline" family="Ionicons" size={20} color={colors.primary.white} />
            <Text style={styles.actionTxt}>Call</Text>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    actionBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: spacing.md,
        borderTopWidth: 0.5,
        borderTopColor: colors.gray[300],
        backgroundColor: colors.background.surface,
        gap: spacing.sm
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        borderRadius: 8,
    },
    actionTxt: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.semiBold,
        color: colors.primary.white,
        marginLeft: spacing.xs,
    },
});
