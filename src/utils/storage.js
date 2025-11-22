import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  FAVORITES: 'favorites',
};

// Check if SecureStore is available (not available on web)
const isSecureStoreAvailable = Platform.OS === 'ios' || Platform.OS === 'android';

// Secure storage for sensitive data (auth tokens)

export const secureStorage = {
  async setItem(key, value) {
    try {
  
      const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
      
      if (isSecureStoreAvailable) {
        await SecureStore.setItemAsync(key, stringValue);
      } else {
        
        await AsyncStorage.setItem(key, stringValue);
      }
    } catch (error) {
      console.error('Error saving to secure storage:', error);
      throw error;
    }
  },

  async getItem(key) {
    try {
      if (isSecureStoreAvailable) {
        return await SecureStore.getItemAsync(key);
      } else {
        
        return await AsyncStorage.getItem(key);
      }
    } catch (error) {
      console.error('Error reading from secure storage:', error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      if (isSecureStoreAvailable) {
        await SecureStore.deleteItemAsync(key);
      } else {
       
        await AsyncStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error removing from secure storage:', error);
    }
  },
};


export const asyncStorage = {
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving to async storage:', error);
      throw error;
    }
  },

  async getItem(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading from async storage:', error);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from async storage:', error);
    }
  },
};

// Auth storage helpers
export const authStorage = {
  async saveToken(token) {
    await secureStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getToken() {
    return await secureStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async removeToken() {
    await secureStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async saveUser(user) {
    await asyncStorage.setItem(STORAGE_KEYS.USER_DATA, user);
  },

  async getUser() {
    return await asyncStorage.getItem(STORAGE_KEYS.USER_DATA);
  },

  async removeUser() {
    await asyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  async clearAuth() {
    await this.removeToken();
    await this.removeUser();
  },
};

// Favorites storage helpers
export const favoritesStorage = {
  async saveFavorites(favorites) {
    await asyncStorage.setItem(STORAGE_KEYS.FAVORITES, favorites);
  },

  async getFavorites() {
    return (await asyncStorage.getItem(STORAGE_KEYS.FAVORITES)) || [];
  },

  async clearFavorites() {
    await asyncStorage.removeItem(STORAGE_KEYS.FAVORITES);
  },
};

export default STORAGE_KEYS;
