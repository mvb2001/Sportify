import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { addFavorite, removeFavorite } from '../redux/slices/favoritesSlice';
import { useTheme } from '../context/ThemeContext';

const DetailsScreen = ({ route, navigation }) => {
  const { team } = route.params;
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.favorites);

  const isFavorite = favorites.some((fav) => fav.idTeam === team.idTeam);

  const handleFavoritePress = () => {
    if (isFavorite) {
      dispatch(removeFavorite(team.idTeam));
    } else {
      dispatch(addFavorite(team));
    }
  };

  const openWebsite = (url) => {
    if (url) {
      Linking.openURL(url.startsWith('http') ? url : `https://${url}`);
    }
  };

  const InfoRow = ({ icon, label, value }) => {
    if (!value) return null;
    return (
      <View style={styles.infoRow}>
        <Feather name={icon} size={20} color={theme.primary} />
        <View style={styles.infoContent}>
          <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
            {label}
          </Text>
          <Text style={[styles.infoValue, { color: theme.text }]}>{value}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { backgroundColor: theme.card }]}>
          <Image
            source={{
              uri: team.strTeamBadge || team.strBadge || team.strTeamLogo || 'https://via.placeholder.com/150',
            }}
            style={styles.badge}
            resizeMode="contain"
            onError={(error) => console.log('Image load error:', error)}
          />
          <Text style={[styles.teamName, { color: theme.text }]}>
            {team.strTeam}
          </Text>
          {team.strAlternate && (
            <Text style={[styles.alternateName, { color: theme.textSecondary }]}>
              {team.strAlternate}
            </Text>
          )}
          <TouchableOpacity
            style={[styles.favoriteButton, { backgroundColor: theme.surface }]}
            onPress={handleFavoritePress}
          >
            <Feather
              name="heart"
              size={24}
              color={isFavorite ? theme.error : theme.textSecondary}
              fill={isFavorite ? theme.error : 'transparent'}
            />
            <Text
              style={[
                styles.favoriteText,
                { color: isFavorite ? theme.error : theme.textSecondary },
              ]}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Team Information
            </Text>
            <InfoRow icon="calendar" label="Founded" value={team.intFormedYear} />
            <InfoRow icon="map-pin" label="Stadium" value={team.strStadium} />
            <InfoRow icon="map" label="Location" value={team.strStadiumLocation} />
            <InfoRow
              icon="users"
              label="Capacity"
              value={team.intStadiumCapacity ? `${team.intStadiumCapacity} seats` : null}
            />
            <InfoRow icon="award" label="League" value={team.strLeague} />
            <InfoRow icon="flag" label="Country" value={team.strCountry} />
          </View>

          {team.strDescriptionEN && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                About
              </Text>
              <Text style={[styles.description, { color: theme.textSecondary }]}>
                {team.strDescriptionEN}
              </Text>
            </View>
          )}

          {(team.strWebsite || team.strFacebook || team.strTwitter || team.strInstagram) && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                Connect
              </Text>
              <View style={styles.socialButtons}>
                {team.strWebsite && (
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: theme.surface }]}
                    onPress={() => openWebsite(team.strWebsite)}
                  >
                    <Feather name="globe" size={24} color={theme.primary} />
                    <Text style={[styles.socialText, { color: theme.text }]}>
                      Website
                    </Text>
                  </TouchableOpacity>
                )}
                {team.strFacebook && (
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: theme.surface }]}
                    onPress={() =>
                      openWebsite(`https://www.facebook.com/${team.strFacebook}`)
                    }
                  >
                    <Feather name="facebook" size={24} color="#1877F2" />
                    <Text style={[styles.socialText, { color: theme.text }]}>
                      Facebook
                    </Text>
                  </TouchableOpacity>
                )}
                {team.strTwitter && (
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: theme.surface }]}
                    onPress={() =>
                      openWebsite(`https://twitter.com/${team.strTwitter}`)
                    }
                  >
                    <Feather name="twitter" size={24} color="#1DA1F2" />
                    <Text style={[styles.socialText, { color: theme.text }]}>
                      Twitter
                    </Text>
                  </TouchableOpacity>
                )}
                {team.strInstagram && (
                  <TouchableOpacity
                    style={[styles.socialButton, { backgroundColor: theme.surface }]}
                    onPress={() =>
                      openWebsite(`https://instagram.com/${team.strInstagram}`)
                    }
                  >
                    <Feather name="instagram" size={24} color="#E4405F" />
                    <Text style={[styles.socialText, { color: theme.text }]}>
                      Instagram
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
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
    padding: 24,
    paddingTop: 32,
  },
  badge: {
    width: 120,
    height: 120,
    marginBottom: 16,
  },
  teamName: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  alternateName: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 8,
  },
  favoriteText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
  },
  socialButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: '47%',
  },
  socialText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DetailsScreen;
