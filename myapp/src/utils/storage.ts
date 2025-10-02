import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Failed to save data for key "${key}":`, error);
    throw error;
  }
};

export const loadData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Failed to load data for key "${key}":`, error);
    return null;
  }
};

export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove data for key "${key}":`, error);
    throw error;
  }
};

export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Failed to clear all data:', error);
    throw error;
  }
};

export const getAllKeys = async (): Promise<readonly string[]> => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Failed to get all keys:', error);
    return [];
  }
};

export const multiSave = async (keyValuePairs: [string, any][]): Promise<void> => {
  try {
    const pairs: [string, string][] = keyValuePairs.map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);
    await AsyncStorage.multiSet(pairs);
  } catch (error) {
    console.error('Failed to save multiple items:', error);
    throw error;
  }
};

export const multiLoad = async <T = any>(keys: string[]): Promise<Record<string, T | null>> => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    const result: Record<string, T | null> = {};

    values.forEach(([key, value]) => {
      result[key] = value != null ? JSON.parse(value) : null;
    });

    return result;
  } catch (error) {
    console.error('Failed to load multiple items:', error);
    return {};
  }
};
