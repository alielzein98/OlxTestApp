import { ImageStyle, StyleProp, TextInputProps, TextStyle, ViewStyle } from "react-native";
import { ICON_TYPE } from "./enums";
import { ToastShowParams } from "react-native-toast-message";

export interface IconProps {
    name: string;
    type?: ICON_TYPE;
    size?: number;
    color?: string;
    testID?: string;
    onPress?: () => void;
    containerStyle?: StyleProp<ViewStyle>;
    showBadge?: boolean;
    badgeNumber?: number;
    showBackground?: boolean;
    family?: string;
    badgeStyle?: StyleProp<ViewStyle>;
}

export interface UseErrorToastOpts {
    error: any;
    isError: boolean;
    title?: string;
    toastProps?: Partial<Omit<ToastShowParams, 'type' | 'text1' | 'text2'>>;
}
export interface CustomInputProps extends TextInputProps {
    label?: string;
    error?: string | null;
    leftIcon?: { name: string; family?: string; color?: string };
    rightIcon?: { name: string; family?: string };
    containerStyle?: StyleProp<ViewStyle>;
    onRightIconPress?: () => void;
    language?: string;
}


export interface CarouselItem {
    imageUrl: string;
    onPress?: () => void;
}
export interface CarouselProps {
    items: CarouselItem[];
    slideHeight: number;
    imageStyle?: StyleProp<ImageStyle>;
    showPagination?: boolean;
    enableModal?: boolean;
    wrapperStyle?: StyleProp<ViewStyle>;
}

export interface HeaderAction {
    name: string;
    onPress: () => void;
    size?: number;
    showBadge?: boolean;
    badgeNumber?: number;
}

export interface HeaderProps {
    title?: string;
    leftAction?: HeaderAction;
    rightActions?: HeaderAction[];
    containerStyle?: StyleProp<ViewStyle>;
}

export interface SettingItem {
    label: string;
    icon: { name: string; family?: string };
    onPress: () => void;
}
export interface SettingSection {
    title: string;
    data: SettingItem[];
}
export interface ProfileListItemProps {
    label: string;
    icon: { name: string; family?: string; color?: string };
    textColor?: string;
    showRightArrow?: boolean;
    onPress: () => void;
    language?: string;
}

export interface SearchBarProps extends TextInputProps {
    leftIcon: string;
    value: string;
    language?: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    style?: StyleProp<ViewStyle>;
    tint?: string;
    rightIcon?: {
        name: string;
        onPress: () => void;
        showBadge?: boolean;
    };
}

export interface SectionListProps<ItemT> {
    title?: string;
    data: ItemT[];
    contentContainerStyle?: StyleProp<ViewStyle>;
    renderItem: (info: { item: ItemT; index: number }) => React.ReactElement;
    onSeeAll?: () => void;
    keyExtractor?: (item: ItemT, index: number) => string;
}

export interface IconLabelCardProps {
    uri: string;
    label: string;
    cardWidth: number;
    cardHeight?: number;
    onPress?: () => void;
    textStyle?: StyleProp<TextStyle>;
    imageStyle?: StyleProp<ImageStyle>;
    containerStyle?: StyleProp<ViewStyle>;
}
export type ProductCategory = 'apartment' | 'car' | 'mobile';


export type ProductCardProps = {
    id?: number;
    category: ProductCategory;
    imageUrl: string;
    price: string;
    period?: string;
    title: string;
    title_ar?: string;
    location: string;
    date: string;
    containerStyle?: object;
    currency?: string;
    onPress?: () => void;
    beds?: number;
    baths?: number;
    area?: number;
    mileage?: string;
    fuel?: string;
    transmission?: string;
    brand?: string;
    condition?: string;
    sellerAvatar?: string;
    floor?: string;
    rooms?: string;
    bathrooms?: string;
    description?: string;
    furnished?: boolean;
    language?: string;
    long?: number;
    lat?: number;
};

export interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    subtitleStyle?: TextStyle;
    iconProps?: {
        name: string;
        size?: number;
        color?: string;
        type?: string;
        family?: string;
    };
}

export interface AdHeaderProps {
    price: number | string;
    currency: string;
    period?: string;
    onLike?: () => void;
    t: any
};

export interface SellerInfoProps {
    sellerName: string;
    sellerAvatar: string;
    t: any
};

export interface MoreDetailsProps {
    category: string;
    ad: any
    t: any
};

export interface LocationMapProps {
    long?: number;
    lat?: number;
    t: any
}

export interface FilterSheetProps {
    locations: string[];
    selectedValues: {
        categories: string[];
        locations: string[];
        priceRange: [number, number];
        titleQuery: string;
    };
    language?: string;
    onApply?: (filters: any) => void;
    onClear?: () => void;
};