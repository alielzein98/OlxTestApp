import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Alert, Linking } from 'react-native';
import { RootState } from '@redux/store';
import { Routes, SettingSection } from '@types';
import i18n, { setLanguage } from 'src/locales/i18n';
import { useTranslation } from 'react-i18next';


export default function useSettingsSections(): SettingSection[] {
  const { isGuest, fname, lname } = useSelector(
    (s: RootState) => s.user
  );
  const { t } = useTranslation();
  return useMemo<SettingSection[]>(() => {
    const sections: SettingSection[] = [];
    if (isGuest) {
      sections.push({
        title: t('my_account'),
        data: [
          {
            label: `${fname} ${lname}`.trim() || t('edit_profile'),
            icon: { name: 'person-outline', family: 'Ionicons' },
            onPress: () => Alert.alert('Info', 'Edit Profile screen is not available yet.'),
          },
          {
            label: t('settings'),
            icon: { name: 'location-on', family: 'MaterialIcons' },
            onPress: () => Alert.alert('Info', 'Settings screen is not available yet.'),
          },
        ],
      });
    }

    sections.push(
      {
        title: 'Company',
        data: [
          {
            label: t('about_us'),
            icon: { name: 'info-outline', family: 'MaterialIcons' },
            onPress: () => Alert.alert('Info', 'About Us screen is not available yet.'),
          },
          {
            label: t('contact_us'),
            icon: { name: 'mail-outline', family: 'Ionicons' },
            onPress: () => Alert.alert('Info', 'Contact Us screen is not available yet.'),
          },
        ],
      },
      {
        title: 'Other',
        data: [
          {
            label: t('privacy_policy'),
            icon: { name: 'shield-check', family: 'MaterialCommunityIcons' },
            onPress: () => Alert.alert('Info', 'Privacy Policy screen is not available yet.'),
          },
          {
            label: t('terms_conditions'),
            icon: { name: 'file-document-outline', family: 'MaterialCommunityIcons' },
            onPress: () => Alert.alert('Info', 'Terms & Conditions screen is not available yet.'),
          },
          {
            label: t('return_exchange_policy'),
            icon: { name: 'currency-exchange', family: 'MaterialIcons' },
            onPress: () => Alert.alert('Info', 'Return & Exchange Policy screen is not available yet.'),
          },
          {
            label: t('change_language') + ` (${i18n.language === "ar" ? "English" : "العربية"})`,
            icon: { name: 'language', family: 'MaterialIcons' },
            onPress: async () => {
              const newLang = i18n.language === "ar" ? "en" : "ar";
              await setLanguage(newLang);
            }
          }
        ],
      }
    );

    return sections;
  }, [isGuest, fname, lname]);
}