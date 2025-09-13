import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Dimensions, View, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { spacing } from '@constants/Spacing';
import { goBack } from '@navigation/navigationref';
import { AdDetailsRouteProp } from '@types';
import Image from '@components/Image/Image';
import { AdHeader } from '@components/AdDetails/AdHeader';
import { SellerInfo } from '@components/AdDetails/SellerInfo';
import { DescriptionSection } from '@components/AdDetails/DescriptionSection';
import { Highlights } from '@components/AdDetails/Highlights';
import { MoreDetails } from '@components/AdDetails/MoreDetails';
import { Amenities } from '@components/AdDetails/Amenities';
import { LocationMap } from '@components/AdDetails/LocationMap';
import { SimilarAds } from '@components/AdDetails/SimilarAds';
import { ActionBar } from '@components/AdDetails/ActionBar';
import { Icon } from '@components';
import { colors } from '@constants/Colors';
import i18n from 'src/locales/i18n';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

const AdDetailsScreen: React.FC = () => {
    const route = useRoute<AdDetailsRouteProp>();
    const ad = route.params.ad;
    const language = i18n.language
    const iconName =
        language === "ar"
            ? Platform.OS === "ios"
                ? "arrow-forward-ios"
                : "arrow-forward"
            : Platform.OS === "ios"
                ? "arrow-back-ios"
                : "arrow-back";
    const { t } = useTranslation();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: spacing.md }}>
                <Image source={ad.imageUrl} style={{ width, height: width * 0.7 }} />
                <TouchableOpacity style={styles.backBtn} onPress={goBack}>
                    <Icon
                        name={iconName}
                        family="MaterialIcons"
                        size={30}
                        color={colors.primary.white}
                    />
                </TouchableOpacity>
                <View style={{ padding: spacing.md, gap: spacing.lg, }}>
                    <AdHeader
                        price={ad.price}
                        currency={ad.currency}
                        period={ad.period}
                        t={t}
                    />
                    <SellerInfo
                        t={t}
                        sellerName={ad.sellerName || 'John Doe'}
                        sellerAvatar={
                            ad.sellerAvatar ||
                            'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg'
                        }
                    />
                    <DescriptionSection
                        description={ad.description}
                        t={t}
                    />
                    <Highlights t={t} />
                    <MoreDetails category={ad.category} ad={ad} t={t} />
                    {ad.category === 'apartment' && <Amenities t={t} />}
                    <LocationMap t={t} long={ad.long} lat={ad.lat} />
                    <SimilarAds ads={[ad, ad, ad]} t={t} />
                </View>
            </ScrollView>
            <ActionBar />
        </SafeAreaView>
    );
};

export default AdDetailsScreen;

const styles = StyleSheet.create({
    backBtn: {
        position: 'absolute',
        top: spacing.lg,
        left: spacing.md,
        borderRadius: 20,
        padding: spacing.sm,
    },
});
