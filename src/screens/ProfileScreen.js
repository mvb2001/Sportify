import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { logout } from '../redux/slices/authSlice';
import { clearFavorites } from '../redux/slices/favoritesSlice';
import { authStorage, favoritesStorage } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.favorites);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            dispatch(logout());
          },
        },
      ]
    );
  };

  const handleClearFavorites = () => {
    if (favorites.length === 0) {
      Alert.alert('No Favorites', 'You have no favorites to clear.');
      return;
    }

    Alert.alert(
      'Clear Favorites',
      'Are you sure you want to remove all favorites?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await favoritesStorage.clearFavorites();
            dispatch(clearFavorites());
            Alert.alert('Success', 'All favorites have been cleared.');
          },
        },
      ]
    );
  };

  const ProfileItem = ({ icon, label, value, onPress, rightComponent }) => (
    <TouchableOpacity
      style={[styles.profileItem, { backgroundColor: theme.card }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.profileItemLeft}>
        <View style={[styles.iconContainer, { backgroundColor: theme.surface }]}>
          <Feather name={icon} size={20} color={theme.primary} />
        </View>
        <View style={styles.profileItemContent}>
          <Text style={[styles.profileLabel, { color: theme.textSecondary }]}>
            {label}
          </Text>
          {value && (
            <Text style={[styles.profileValue, { color: theme.text }]}>
              {value}
            </Text>
          )}
        </View>
      </View>
      {rightComponent || (
        onPress && (
          <Feather name="chevron-right" size={20} color={theme.textSecondary} />
        )
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: theme.card }]}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.primary }]}>
            {user?.image ? (
              <Image source={{ uri: user.image }} style={styles.avatar} />
            ) : (
              <Text style={styles.avatarText}>
                {user?.firstName?.[0] || user?.username?.[0] || 'U'}
              </Text>
            )}
          </View>
          <Text style={[styles.userName, { color: theme.text }]}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
            @{user?.username}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            ACCOUNT
          </Text>
          <ProfileItem
            icon="user"
            label="Username"
            value={user?.username}
          />
          <ProfileItem
            icon="mail"
            label="Email"
            value={user?.email || 'Not provided'}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            PREFERENCES
          </Text>
          <ProfileItem
            icon={isDarkMode ? 'moon' : 'sun'}
            label="Dark Mode"
            value={isDarkMode ? 'Enabled' : 'Disabled'}
            rightComponent={
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.border, true: theme.primary }}
                thumbColor="#FFFFFF"
              />
            }
          />
          <ProfileItem
            icon="heart"
            label="Favorites"
            value={`${favorites.length} teams`}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
            ACTIONS
          </Text>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.card }]}
            onPress={handleClearFavorites}
          >
            <Feather name="trash-2" size={20} color={theme.warning} />
            <Text style={[styles.actionText, { color: theme.warning }]}>
              Clear Favorites
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: theme.card }]}
            onPress={handleLogout}
          >
            <Feather name="log-out" size={20} color={theme.error} />
            <Text style={[styles.actionText, { color: theme.error }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Sportify v1.0.0
          </Text>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Made with ❤️ for sports fans
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: 1,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileItemContent: {
    flex: 1,
  },
  profileLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  profileValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    marginBottom: 4,
  },
});

export default ProfileScreen;
