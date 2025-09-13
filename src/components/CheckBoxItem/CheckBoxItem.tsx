import Text from "@components/Text/Text";
import { colors } from "@constants/Colors";
import { fontSizes } from "@constants/Fonts";
import { spacing } from "@constants/Spacing";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export const CheckboxItem: React.FC<{ label: string; checked: boolean; onPress: () => void }> = ({
    label,
    checked,
    onPress,
}) => (
    <TouchableOpacity style={styles.checkboxRow} onPress={onPress}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]} />
        <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
 
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.xs,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: colors.gray[400],
        backgroundColor: colors.background.surface,
    },
    checkboxChecked: {
        backgroundColor: colors.primary.base,
        borderColor: colors.primary.base,
    },
    checkboxLabel: {
        fontSize: fontSizes.sm,
        color: colors.text.primary,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
});