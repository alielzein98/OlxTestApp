import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomTextInput, FullWidthButton, Text } from '@components';
import { colors } from '@constants/Colors';
import { spacing } from '@constants/Spacing';
import { fontSizes, fontWeights } from '@constants/Fonts';
import { setIsAuthenticated, setIsGuest, setUser } from '@redux/slices/userSlice';
import { EMAIL_RX, PASS_RX, Routes } from '@types';
import { useErrorToast } from '@hooks';
import { IS_GUEST, USER_DATA } from '@constants/StorageKeys';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { saveToStorage } from '@services/storageService';
import { useTranslation } from 'react-i18next';
import i18n from 'src/locales/i18n';

const LoginScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<unknown>(null);
  const [isError, setIsError] = useState(false);
  const language = i18n.language;
  const continueGuest = async () => {
    await saveToStorage(IS_GUEST, 'true');
    dispatch(setIsGuest(true));
  };

  const signIn = async () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!EMAIL_RX.test(email.trim())) newErrors.email = 'Enter a valid email';
    if (!PASS_RX.test(password)) newErrors.password = 'Min 3 characters';
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }
    const FAKE_USER = {
      email: 'user@olx.com',
      password: '123456',
    };
    if (email.trim().toLowerCase() === FAKE_USER.email && password === FAKE_USER.password) {
      setErrors({});
      setIsError(false);
      await saveToStorage(IS_GUEST, 'false');
      await saveToStorage(USER_DATA, JSON.stringify(FAKE_USER));
      dispatch(setIsGuest(false));
      dispatch(setIsAuthenticated(true));
      dispatch(setUser(FAKE_USER));
    } else {
      setIsError(true);
      setError('Invalid email or password. Try: user@olx.com / 123456');
      setErrors({
        email: 'Invalid credentials',
        password: 'Invalid credentials'
      });
    }
  };
  useErrorToast({
    isError,
    error,
    title: 'Login Failed',
  });
  console.log('language', language);
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, gap: spacing.sm, }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        extraScrollHeight={0}
      >
        <View style={styles.header}>
          <View style={{ gap: spacing.xs }}>
            <Text style={styles.welcome}>{t('welcome_text')}</Text>
            <Text style={styles.tagline}>{t('begin_your_journey')}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={[styles.title, { textAlign: 'left' }]}>{t('login')}</Text>
          <View style={styles.demoHint}>
            <Text style={styles.demoText}>{t('demo_credentials')}:</Text>
            <Text style={styles.demoCredentials}>{t('email')}: user@olx.com</Text>
            <Text style={styles.demoCredentials}>{t('password')}: 123456</Text>
          </View>

          <View style={{ gap: spacing.md }}>
            <CustomTextInput
              label={t('email')}
              placeholder={t('email_placeholder')}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={{ name: 'mail-outline', family: 'Ionicons' }}
              value={email}
              error={errors.email}
              language={language}
              onChangeText={setEmail}
            />
            <CustomTextInput
              label={t('password')}
              placeholder="••••••••"
              secureTextEntry
              leftIcon={{ name: 'lock-closed-outline', family: 'Ionicons' }}
              value={password}
              onChangeText={setPassword}
              error={errors.password}
              language={language}
              style={{ textAlign: language === 'ar' ? 'right' : 'left' }}
            />
            <View>
              <TouchableOpacity
                onPress={() => Alert.alert('Info', 'Forgot Password screen is not available yet.')}
                activeOpacity={0.7}
              >
                <Text style={[styles.forgotTxt, { textAlign: language === 'ar' ? 'left' : 'right' }]}>{t('forgot_password')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <FullWidthButton
            title={t('login')}
            buttonStyle={{ marginBottom: 0, opacity: 1 }}
            containerStyle={{ paddingHorizontal: 0, paddingBottom: 0 }}
            onPress={signIn}
          />

          <View style={{ gap: spacing.xl }}>
            <TouchableOpacity
              style={styles.guestBtn}
              onPress={continueGuest}
              activeOpacity={0.7}
            >
              <Text style={styles.guestTxt}>{t('continue_as_guest')}</Text>
            </TouchableOpacity>
            <View style={styles.footer}>
              <Text style={{ fontWeight: fontWeights.semiBold }}>
                {t('dont_have_account')}
              </Text>
              <TouchableOpacity
                onPress={() => Alert.alert('Info', 'Register screen is not available yet.')}
                activeOpacity={0.7}
              >
                <Text style={styles.link}>{t('sign_up')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.surface,
  },
  header: {
    flex: 0.35,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  logo: {
    width: '80%',
    height: 100,
    resizeMode: 'contain',
  },
  welcome: {
    fontSize: fontSizes.xxxl,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    color: colors.text.primary,

  },
  tagline: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
    textAlign: 'center',
    color: colors.text.secondary,

  },
  card: {
    flex: 0.65,
    backgroundColor: colors.background.default,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: spacing.md,
    paddingTop: spacing.xxl,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
    gap: spacing.xl,
  },
  title: {
    fontSize: fontSizes.xl,
    color: colors.text.primary,
    fontWeight: fontWeights.bold,

  },
  primaryTxt: {
    color: colors.primary.white,
    textAlign: 'center',
    fontWeight: fontWeights.semiBold,
  },
  forgotTxt: {
    color: colors.primary.base,
    fontWeight: fontWeights.semiBold,
  },
  guestBtn: {
    borderRadius: 12,
    marginTop: spacing.md,
  },
  guestTxt: {
    textAlign: 'center',
    color: colors.primary.base,
    fontWeight: fontWeights.semiBold,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.default,
  },
  link: {
    color: colors.primary.base,
    fontWeight: fontWeights.semiBold,
  },
  demoHint: {
    backgroundColor: colors.background.surface,
    padding: spacing.sm,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary.base,
    alignItems: 'flex-start',
  },
  demoText: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semiBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  demoCredentials: {
    fontSize: fontSizes.sm,
    color: colors.text.secondary,
    fontWeight: fontWeights.medium,
  },
});

export default LoginScreen;
