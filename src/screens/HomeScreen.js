import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import {
  fetchTeamsStart,
  fetchTeamsSuccess,
  fetchTeamsFailure,
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
} from '../redux/slices/sportsSlice';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { sportsService } from '../services/sportsService';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import LoadingSpinner from '../components/LoadingSpinner';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { teams, events, loading } = useSelector((state) => state.sports);
  const { favorites } = useSelector((state) => state.favorites);
  const { user } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTeams, setFilteredTeams] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [activeTab, setActiveTab] = useState('teams');
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchTeams();
    fetchMatches();
    fetchPlayers();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredTeams(teams);
      setFilteredMatches(events);
      setFilteredPlayers(players);
    } else {
      const filteredT = teams.filter((team) =>
        team.strTeam?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredTeams(filteredT);

      const filteredM = events.filter((match) =>
        match.strEvent?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.strHomeTeam?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        match.strAwayTeam?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMatches(filteredM);

      if (activeTab === 'players' && searchQuery.trim() !== '') {
        searchPlayers(searchQuery);
      } else {
        const filteredP = players.filter((player) =>
          player.strPlayer?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredPlayers(filteredP);
      }
    }
  }, [searchQuery, teams, events, players, activeTab]);

  const fetchTeams = async () => {
    dispatch(fetchTeamsStart());
    try {
      const data = await sportsService.getTeamsByLeague();
      const teams = Array.isArray(data) ? data : [];
      dispatch(fetchTeamsSuccess(teams));
    } catch (error) {
      console.error('Error in fetchTeams:', error);
      dispatch(fetchTeamsFailure(error.message || 'Failed to fetch teams'));
      dispatch(fetchTeamsSuccess([]));
    }
  };

  const fetchMatches = async () => {
    dispatch(fetchEventsStart());
    try {
      const data = await sportsService.getEventsByLeague();
      const events = Array.isArray(data) ? data : [];
      dispatch(fetchEventsSuccess(events));
    } catch (error) {
      console.error('Error in fetchMatches:', error);
      dispatch(fetchEventsFailure(error.message || 'Failed to fetch matches'));
      dispatch(fetchEventsSuccess([]));
    }
  };

  const fetchPlayers = async () => {
    try {
      const data = await sportsService.getPopularPlayers();
      const players = Array.isArray(data) ? data : [];
      setPlayers(players);
    } catch (error) {
      console.error('Error fetching players:', error);
      setPlayers([]);
    }
  };

  const searchPlayers = async (query) => {
    try {
      if (!query || query.trim() === '') {
        fetchPlayers();
      } else {
        const data = await sportsService.searchPlayers(query);
        const players = Array.isArray(data) ? data : [];
        setPlayers(players);
      }
    } catch (error) {
      console.error('Error searching players:', error);
      setPlayers([]);
    }
  };

  const handleTeamPress = (team) => {
    navigation.navigate('Details', { team });
  };

  const handleMatchPress = (match) => {
    navigation.navigate('MatchDetails', { match });
  };

  const handlePlayerPress = (player) => {
    navigation.navigate('PlayerDetails', { player });
  };

  const handleRefresh = () => {
    if (activeTab === 'teams') {
      fetchTeams();
    } else if (activeTab === 'matches') {
      fetchMatches();
    } else {
      fetchPlayers();
    }
  };

  const handleFavoritePress = (team) => {
    const isFavorite = favorites.some((fav) => fav.idTeam === team.idTeam);
    if (isFavorite) {
      dispatch(removeFavorite(team.idTeam));
    } else {
      dispatch(addFavorite(team));
    }
  };

  const isFavorite = (teamId) => {
    return favorites.some((fav) => fav.idTeam === teamId);
  };

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'teams' && { backgroundColor: theme.primary },
        ]}
        onPress={() => setActiveTab('teams')}
      >
        <Feather
          name="shield"
          size={20}
          color={activeTab === 'teams' ? '#FFFFFF' : theme.textSecondary}
        />
        <Text
          style={[
            styles.tabText,
            {
              color: activeTab === 'teams' ? '#FFFFFF' : theme.textSecondary,
            },
          ]}
        >
          Teams
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'matches' && { backgroundColor: theme.primary },
        ]}
        onPress={() => setActiveTab('matches')}
      >
        <Feather
          name="activity"
          size={20}
          color={activeTab === 'matches' ? '#FFFFFF' : theme.textSecondary}
        />
        <Text
          style={[
            styles.tabText,
            {
              color: activeTab === 'matches' ? '#FFFFFF' : theme.textSecondary,
            },
          ]}
        >
          Matches
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          activeTab === 'players' && { backgroundColor: theme.primary },
        ]}
        onPress={() => {
          setActiveTab('players');
          if (players.length === 0) {
            fetchPlayers();
          }
        }}
      >
        <Feather
          name="users"
          size={20}
          color={activeTab === 'players' ? '#FFFFFF' : theme.textSecondary}
        />
        <Text
          style={[
            styles.tabText,
            {
              color: activeTab === 'players' ? '#FFFFFF' : theme.textSecondary,
            },
          ]}
        >
          Players
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.welcomeSection}>
        <Text style={[styles.welcomeText, { color: theme.textSecondary }]}>
          Welcome back,
        </Text>
        <Text style={[styles.userName, { color: theme.text }]}>
          {user?.firstName || user?.username || 'User'}
        </Text>
      </View>

      {renderTabs()}
      
      <View style={[styles.searchContainer, { backgroundColor: theme.surface }]}>
        <Feather name="search" size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder={`Search ${activeTab}...`}
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Feather name="x" size={20} color={theme.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderMatchCard = (match) => {
    if (!match || !match.idEvent) return null;
    
    return (
      <TouchableOpacity
        key={match.idEvent}
        style={[styles.matchCard, { backgroundColor: theme.card }]}
        onPress={() => handleMatchPress(match)}
      >
        <View style={styles.matchHeader}>
          <Text style={[styles.matchDate, { color: theme.textSecondary }]}>
            {match.dateEvent || 'TBA'} • {match.strTime || 'TBA'}
          </Text>
          <View
            style={[
              styles.matchStatus,
              { backgroundColor: theme.primary + '20' },
            ]}
          >
            <Text style={[styles.matchStatusText, { color: theme.primary }]}>
              {match.intHomeScore && match.intAwayScore
                ? 'FT'
                : match.strStatus || 'Scheduled'}
            </Text>
          </View>
        </View>
        <View style={styles.matchTeams}>
          <Text style={[styles.teamName, { color: theme.text }]}>
            {match.strHomeTeam || 'Team'}
          </Text>
          <Text style={[styles.score, { color: theme.primary }]}>
            {match.intHomeScore || '-'} : {match.intAwayScore || '-'}
          </Text>
          <Text style={[styles.teamName, { color: theme.text }]}>
            {match.strAwayTeam || 'Team'}
          </Text>
        </View>
        {match.strLeague && (
          <Text style={[styles.matchLeague, { color: theme.textSecondary }]}>
            {match.strLeague}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  const renderPlayerCard = (player) => {
    if (!player || !player.idPlayer) return null;
    
    return (
      <TouchableOpacity
        key={player.idPlayer}
        style={[styles.playerCard, { backgroundColor: theme.card }]}
        onPress={() => handlePlayerPress(player)}
      >
        <View style={styles.playerContent}>
          <Text style={[styles.playerName, { color: theme.text }]}>
            {player.strPlayer || 'Unknown Player'}
          </Text>
          {player.strPosition && (
            <Text style={[styles.playerPosition, { color: theme.textSecondary }]}>
              {player.strPosition}
            </Text>
          )}
          {player.strTeam && (
            <View style={styles.playerTeam}>
              <Feather name="shield" size={14} color={theme.primary} />
              <Text style={[styles.playerTeamText, { color: theme.textSecondary }]}>
                {player.strTeam}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyComponent = () => {
    const emptyMessages = {
      teams: 'No teams found',
      matches: 'No matches found',
      players: 'No players found',
    };
    
    return (
      <View style={styles.emptyContainer}>
        <Feather name="search" size={64} color={theme.textSecondary} />
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
          {emptyMessages[activeTab]}
        </Text>
      </View>
    );
  };

  const renderContent = () => {
    if (activeTab === 'teams') {
      return (
        <FlatList
          data={filteredTeams}
          keyExtractor={(item) => item?.idTeam?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <Card
              item={item}
              onPress={() => handleTeamPress(item)}
              onFavoritePress={() => handleFavoritePress(item)}
              isFavorite={isFavorite(item.idTeam)}
            />
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              tintColor={theme.primary}
              colors={[theme.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      );
    } else if (activeTab === 'matches') {
      return (
        <FlatList
          data={filteredMatches}
          keyExtractor={(item) => item?.idEvent?.toString() || Math.random().toString()}
          renderItem={({ item }) => renderMatchCard(item)}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyComponent}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={handleRefresh}
              tintColor={theme.primary}
              colors={[theme.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      );
    } else {
      return (
        <FlatList
          data={filteredPlayers}
          keyExtractor={(item) => item?.idPlayer?.toString() || Math.random().toString()}
          renderItem={({ item }) => renderPlayerCard(item)}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyComponent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      );
    }
  };

  if (loading && teams.length === 0 && events.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  headerContainer: {
    padding: 16,
  },
  welcomeSection: {
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 14,
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(78, 205, 196, 0.1)',
    gap: 8,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  matchCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  matchDate: {
    fontSize: 12,
  },
  matchStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  matchTeams: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  teamName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  score: {
    fontSize: 20,
    fontWeight: '700',
    marginHorizontal: 16,
  },
  matchLeague: {
    fontSize: 12,
    marginTop: 4,
  },
  playerCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerContent: {
    gap: 8,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '700',
  },
  playerPosition: {
    fontSize: 14,
  },
  playerTeam: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  playerTeamText: {
    fontSize: 12,
  },
});

export default HomeScreen;
