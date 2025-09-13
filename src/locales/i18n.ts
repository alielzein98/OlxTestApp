import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import en from "./translations/en.json";
import ar from "./translations/ar.json";
import { LANGUAGE_KEY } from "@constants/StorageKeys";
import { reloadAppAsync } from "expo";


const resources = {
    en: { translation: en },
    ar: { translation: ar },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en", // default
    fallbackLng: "en",
    interpolation: { escapeValue: false },
});

export async function setLanguage(lang: "en" | "ar") {
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    await i18n.changeLanguage(lang);
    const isArabic = lang === "ar";
    if (I18nManager.isRTL !== isArabic) {
        I18nManager.allowRTL(isArabic);
        I18nManager.forceRTL(isArabic);
        await reloadAppAsync();
    }
}

export async function loadLanguage() {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    const lang = storedLang || "en";
    await setLanguage(lang as "en" | "ar");
}

export default i18n;