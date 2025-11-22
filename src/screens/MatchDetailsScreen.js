import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/slices/favoritesSlice';

const MatchDetailsScreen = ({ route, navigation }) => {
  const { match } = route.params;
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items || []);

  const isFavorite = Array.isArray(favorites) && favorites.some((fav) => fav.idEvent === match.idEvent);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({ ...match, type: 'match' }));
  };

  const openVideo = () => {
    if (match.strVideo) {
      Linking.openURL(match.strVideo);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleToggleFavorite} style={{ marginRight: 16 }}>
          <Feather
            name={isFavorite ? 'heart' : 'heart'}
            size={24}
            color={isFavorite ? '#e74c3c' : theme.text}
            style={isFavorite ? { fill: '#e74c3c' } : {}}
          />
        </TouchableOpacity>
      ),
    });
  }, [isFavorite, theme]);

  const InfoRow = ({ icon, label, value }) => {
    if (!value || value === '') return null;
    return (
      <View style={[styles.infoRow, { borderBottomColor: theme.border }]}>
        <View style={styles.infoLabel}>
          <Feather name={icon} size={18} color={theme.primary} />
          <Text style={[styles.labelText, { color: theme.textSecondary }]}>{label}</Text>
        </View>
        <Text style={[styles.valueText, { color: theme.text }]}>{value}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Score Card */}
      <View style={[styles.scoreCard, { backgroundColor: theme.card }]}>
        <View style={styles.teamsContainer}>
          {/* Home Team */}
          <View style={styles.teamSection}>
            <Image
              source={{ uri: match.strHomeTeamBadge || match.strThumb || 'https://via.placeholder.com/80' }}
              style={styles.teamBadge}
            />
            <Text style={[styles.teamName, { color: theme.text }]}>{match.strHomeTeam}</Text>
          </View>

          {/* Score */}
          <View style={styles.scoreSection}>
            <Text style={[styles.score, { color: theme.text }]}>
              {match.intHomeScore !== null ? match.intHomeScore : '-'}
              {' : '}
              {match.intAwayScore !== null ? match.intAwayScore : '-'}
            </Text>
            <Text style={[styles.statusText, { color: theme.primary }]}>
              {match.strStatus || 'Scheduled'}
            </Text>
          </View>

          {/* Away Team */}
          <View style={styles.teamSection}>
            <Image
              source={{ uri: match.strAwayTeamBadge || match.strThumb || 'https://via.placeholder.com/80' }}
              style={styles.teamBadge}
            />
            <Text style={[styles.teamName, { color: theme.text }]}>{match.strAwayTeam}</Text>
          </View>
        </View>
      </View>

      {/* Match Info Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <View style={styles.sectionHeader}>
          <Feather name="info" size={20} color={theme.primary} />
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Match Information</Text>
        </View>

        <InfoRow icon="calendar" label="Date" value={match.dateEvent} />
        <InfoRow icon="clock" label="Time" value={match.strTime} />
        <InfoRow icon="map-pin" label="Venue" value={match.strVenue} />
        <InfoRow icon="award" label="League" value={match.strLeague} />
        <InfoRow icon="hash" label="Round" value={match.intRound} />
        <InfoRow icon="flag" label="Season" value={match.strSeason} />
      </View>

      {/* Match Description */}
      {match.strDescriptionEN && (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <Feather name="file-text" size={20} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Match Details</Text>
          </View>
          <Text style={[styles.descriptionText, { color: theme.textSecondary }]}>
            {match.strDescriptionEN}
          </Text>
        </View>
      )}

      {/* Video Highlights */}
      {match.strVideo && (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <TouchableOpacity
            style={[styles.videoButton, { backgroundColor: theme.primary }]}
            onPress={openVideo}
          >
            <Feather name="play-circle" size={24} color="#fff" />
            <Text style={styles.videoButtonText}>Watch Highlights</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scoreCard: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  teamsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
    gap: 12,
  },
  teamBadge: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreSection: {
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 20,
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  card: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
  },
  valueText: {
    fontSize: 14,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
  },
  videoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 16,
    borderRadius: 12,
  },
  videoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MatchDetailsScreen;
