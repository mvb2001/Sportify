import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { setFavorites, removeFavorite } from '../redux/slices/favoritesSlice';
import { favoritesStorage } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';

const FavoritesScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await favoritesStorage.getFavorites();
      dispatch(setFavorites(savedFavorites));
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async () => {
    try {
      await favoritesStorage.saveFavorites(favorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const handleTeamPress = (team) => {
    navigation.navigate('Details', { team });
  };

  const handleFavoritePress = (team) => {
    dispatch(removeFavorite(team.idTeam));
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={64} color={theme.textSecondary} />
      <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
        No favorites yet
      </Text>
      <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
        Add teams to your favorites to see them here
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.idTeam}
        renderItem={({ item }) => (
          <Card
            item={item}
            onPress={() => handleTeamPress(item)}
            onFavoritePress={() => handleFavoritePress(item)}
            isFavorite={true}
          />
        )}
        ListEmptyComponent={renderEmptyComponent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={favorites.length === 0 && styles.emptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyList: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default FavoritesScreen;
