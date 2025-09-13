import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@constants/Colors";
import { spacing } from "@constants/Spacing";
import { fontSizes } from "@constants/Fonts";
import { Icon } from "@components/Icon/Icon";
import Text from "@components/Text/Text";

type Props = {
    filters: {
        categories: string[];
        locations: string[];
        priceRange: [number, number];
        titleQuery: string;
    };
    onRemove: (type: string, value?: string) => void;
};

export const FilterTags: React.FC<Props> = ({ filters, onRemove }) => {
    const tags: { type: string; value: string }[] = [];
    filters.categories.forEach((cat) => tags.push({ type: "categories", value: cat }));
    filters.locations.forEach((loc) => tags.push({ type: "locations", value: loc }));
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 60000) {
        tags.push({
            type: "priceRange",
            value: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`
        });
    }
    if (filters.titleQuery.trim()) {
        tags.push({ type: "titleQuery", value: filters.titleQuery });
    }
    if (tags.length === 0) return null;
    return (
        <View style={styles.container}>
            {tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>
                        {tag.value.charAt(0).toUpperCase() + tag.value.slice(1)}
                    </Text>
                    <TouchableOpacity onPress={() => onRemove(tag.type, tag.value)}>
                        <Icon name="close" size={16} color={colors.primary.white} />
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.xs,
        paddingHorizontal: spacing.md,
        marginBottom: spacing.sm,
    },
    tag: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.primary.base,
        borderRadius: 16,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xxs,
        gap: 4,
    },
    tagText: {
        color: colors.primary.white,
        fontSize: fontSizes.sm,
    },
});
