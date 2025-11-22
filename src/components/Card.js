import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const Card = ({ item, onPress, onFavoritePress, isFavorite }) => {
  const { theme } = useTheme();

  const getStatusColor = (status) => {
    if (!status) return theme.textSecondary;
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('active') || lowerStatus.includes('upcoming')) {
      return theme.success;
    }
    if (lowerStatus.includes('popular')) {
      return theme.warning;
    }
    return theme.textSecondary;
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: theme.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image
        source={{
          uri: item.strTeamBadge || item.strBadge || item.strTeamLogo || 'https://via.placeholder.com/150',
        }}
        style={styles.image}
        resizeMode="contain"
        onError={(error) => console.log('Image load error:', error)}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]} numberOfLines={2}>
            {item.strTeam || item.strEvent || item.name || 'Unknown'}
          </Text>
          {onFavoritePress && (
            <TouchableOpacity
              onPress={onFavoritePress}
              style={styles.favoriteButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Feather
                name="heart"
                size={22}
                color={isFavorite ? theme.error : theme.textSecondary}
                fill={isFavorite ? theme.error : 'transparent'}
              />
            </TouchableOpacity>
          )}
        </View>
        {item.strLeague && (
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {item.strLeague}
          </Text>
        )}
        {item.strStadium && (
          <View style={styles.infoRow}>
            <Feather name="map-pin" size={14} color={theme.textSecondary} />
            <Text style={[styles.info, { color: theme.textSecondary }]}>
              {item.strStadium}
            </Text>
          </View>
        )}
        {item.strDescriptionEN && (
          <Text
            style={[styles.description, { color: theme.textSecondary }]}
            numberOfLines={2}
          >
            {item.strDescriptionEN}
          </Text>
        )}
        {(item.status || item.intFormedYear) && (
          <View style={styles.footer}>
            {item.status && (
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(item.status) + '20' },
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(item.status) },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            )}
            {item.intFormedYear && (
              <Text style={[styles.year, { color: theme.textSecondary }]}>
                Est. {item.intFormedYear}
              </Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    marginBottom: 12,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: '500',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  info: {
    fontSize: 13,
    marginLeft: 6,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  year: {
    fontSize: 12,
    fontWeight: '500',
  },
  favoriteButton: {
    padding: 4,
  },
});

export default Card;
