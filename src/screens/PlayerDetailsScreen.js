import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/slices/favoritesSlice';

const PlayerDetailsScreen = ({ route, navigation }) => {
  const { player } = route.params;
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items || []);
  const [imageLoading, setImageLoading] = useState(true);

  const isFavorite = Array.isArray(favorites) && favorites.some((fav) => fav.idPlayer === player.idPlayer);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite({ ...player, type: 'player' }));
  };

  const openLink = (url) => {
    if (url && url !== '') {
      Linking.openURL(url.startsWith('http') ? url : `https://${url}`);
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
      {/* Player Image */}
      <View style={[styles.imageContainer, { backgroundColor: theme.card }]}>
        {imageLoading && (
          <ActivityIndicator
            size="large"
            color={theme.primary}
            style={styles.imageLoader}
          />
        )}
        <Image
          source={{
            uri: player.strThumb || player.strCutout || player.strRender || 'https://via.placeholder.com/300x400?text=No+Image',
          }}
          style={styles.playerImage}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          resizeMode="contain"
        />
      </View>

      {/* Player Info Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.playerName, { color: theme.text }]}>
          {player.strPlayer}
        </Text>
        
        {player.strPosition && (
          <View style={[styles.positionBadge, { backgroundColor: theme.primary }]}>
            <Text style={styles.positionText}>{player.strPosition}</Text>
          </View>
        )}

        <View style={styles.divider} />

        <InfoRow icon="users" label="Team" value={player.strTeam} />
        <InfoRow icon="flag" label="Nationality" value={player.strNationality} />
        <InfoRow icon="calendar" label="Date of Birth" value={player.dateBorn} />
        <InfoRow icon="map-pin" label="Birth Place" value={player.strBirthLocation} />
        <InfoRow icon="activity" label="Height" value={player.strHeight} />
        <InfoRow icon="trending-up" label="Weight" value={player.strWeight} />
        <InfoRow icon="award" label="Status" value={player.strStatus} />
      </View>

      {/* Biography */}
      {player.strDescriptionEN && (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <Feather name="file-text" size={20} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Biography</Text>
          </View>
          <Text style={[styles.bioText, { color: theme.textSecondary }]}>
            {player.strDescriptionEN}
          </Text>
        </View>
      )}

      {/* Social Media Links */}
      {(player.strFacebook || player.strTwitter || player.strInstagram) && (
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <View style={styles.sectionHeader}>
            <Feather name="share-2" size={20} color={theme.primary} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Social Media</Text>
          </View>
          <View style={styles.socialLinks}>
            {player.strFacebook && (
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: '#1877f2' }]}
                onPress={() => openLink(`https://facebook.com/${player.strFacebook}`)}
              >
                <Feather name="facebook" size={20} color="#fff" />
                <Text style={styles.socialButtonText}>Facebook</Text>
              </TouchableOpacity>
            )}
            {player.strTwitter && (
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: '#1da1f2' }]}
                onPress={() => openLink(`https://twitter.com/${player.strTwitter}`)}
              >
                <Feather name="twitter" size={20} color="#fff" />
                <Text style={styles.socialButtonText}>Twitter</Text>
              </TouchableOpacity>
            )}
            {player.strInstagram && (
              <TouchableOpacity
                style={[styles.socialButton, { backgroundColor: '#e4405f' }]}
                onPress={() => openLink(`https://instagram.com/${player.strInstagram}`)}
              >
                <Feather name="instagram" size={20} color="#fff" />
                <Text style={styles.socialButtonText}>Instagram</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imageLoader: {
    position: 'absolute',
  },
  playerImage: {
    width: '100%',
    height: '100%',
  },
  card: {
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  playerName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  positionBadge: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
  },
  positionText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bioText: {
    fontSize: 14,
    lineHeight: 22,
  },
  socialLinks: {
    gap: 12,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 12,
    borderRadius: 8,
  },
  socialButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default PlayerDetailsScreen;
