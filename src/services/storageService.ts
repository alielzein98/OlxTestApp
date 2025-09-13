import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveToStorage(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
}

export async function getFromStorage(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
}

export async function clearFromStorage(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
}