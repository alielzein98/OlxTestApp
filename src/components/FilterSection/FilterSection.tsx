import Text from "@components/Text/Text";
import { colors } from "@constants/Colors";
import { fontSizes, fontWeights } from "@constants/Fonts";
import { spacing } from "@constants/Spacing";
import { StyleSheet, View } from "react-native";

export const FilterSection: React.FC<{ title: string; language?: string; children: React.ReactNode }> = ({
    title,
    language,
    children,
}) => (
    <View style={{ gap: spacing.sm }}>
        <Text style={[styles.sectionTitle, { textAlign: language === 'ar' ? 'left' : 'right' }]}>{title}</Text>
        <View style={{ gap: spacing.xs }}>{children}</View>
    </View>
);

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: fontSizes.md,
        fontWeight: fontWeights.medium,
        color: colors.text.primary,
    },
});