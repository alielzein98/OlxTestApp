import React from 'react';
import { StyleSheet, ScrollView, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, ProfileListItem, GlobalHeader } from '@components';
import { colors } from '@constants/Colors';
import { spacing } from '@constants/Spacing';
import { fontSizes } from '@constants/Fonts';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated, setIsGuest } from '@redux/slices/userSlice';
import { RootState } from '@redux/store';
import useSettingsSections from '@constants/ProfileSections';
import { navigationRef } from '@navigation/navigationref';
import { Routes } from '@types';
import { clearFromStorage, saveToStorage } from '@services/storageService';
import { IS_GUEST, USER_DATA } from '@constants/StorageKeys';
import { useTranslation } from 'react-i18next';
import i18n from 'src/locales/i18n';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const sections = useSettingsSections();
  const { isAuthenticated } = useSelector((s: RootState) => s.user);
  const { t } = useTranslation();
  const language = i18n.language
  const logout = async () => {
    await clearFromStorage(USER_DATA);
    await clearFromStorage(IS_GUEST);
    await saveToStorage(IS_GUEST, 'true');
    dispatch(setIsGuest(true));
    dispatch(setIsAuthenticated(false));
  }
  const confirmLogout = () =>
    Alert.alert(t('logout'), t('are_you_sure_logout'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('logout'),
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  const confirmDeleteAccount = () =>
    Alert.alert(
      t('delete_account'),
      t('are_you_sure_delete_account'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: () => logout(),
        },
      ],
    );
  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <GlobalHeader
        title={t('profile')}
        containerStyle={{ paddingHorizontal: spacing.md }}
        leftAction={{
          name: 'person',
          size: 24,
          onPress: () => null,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacing.md, gap: spacing.xl }}
      >
        {sections.map(section => (
          <View key={section.title} style={styles.card}>
            <Text style={styles.cardTitle}>{section.title}</Text>
            {section.data.map((item, idx) => {
              const isLast = idx === section.data.length - 1;
              return (
                <React.Fragment key={item.label}>
                  <ProfileListItem
                    label={item.label}
                    icon={item.icon}
                    onPress={item.onPress}
                    language={language}
                    showRightArrow
                  />
                  {!isLast && <View style={styles.itemDivider} />}
                </React.Fragment>
              );
            })}
          </View>
        ))}
        {isAuthenticated && (
          <>
            <View style={styles.card}>
              <ProfileListItem
                label={t('logout')}
                textColor={colors.semantic.error}
                icon={{
                  name: 'logout',
                  family: 'MaterialIcons',
                  color: colors.semantic.error,
                }}
                onPress={confirmLogout} />
            </View>
            <View style={styles.card}>
              <ProfileListItem
                label={t('delete_account')}
                textColor={colors.semantic.error}
                icon={{
                  name: 'trash-outline',
                  family: 'Ionicons',
                  color: colors.semantic.error,
                }}
                onPress={confirmDeleteAccount} />
            </View>
          </>
        )}
        {!isAuthenticated && (
          <View style={styles.card}>
            <ProfileListItem
              label={t('login')}
              icon={{
                name: 'login',
                family: 'MaterialIcons',
              }}
              onPress={() => {
                dispatch(setIsGuest(false));
                navigationRef.resetRoot({
                  index: 0,
                  routes: [{ name: Routes.LoginScreen }],
                });
              }}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.surface,
  },
  headerText: {
    fontWeight: 'bold',
    color: colors.text.primary,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  card: {
    backgroundColor: colors.background.default,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: fontSizes.lg,
    fontWeight: '600',
    color: colors.text.secondary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  itemDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray[300],
  },
  logoutButton: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    backgroundColor: '#ff4d4d',
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: fontSizes.md,
    fontWeight: '600',
    color: colors.background.default,
  },
});

export default ProfileScreen;
