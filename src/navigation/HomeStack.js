import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import MatchDetailsScreen from '../screens/MatchDetailsScreen';
import PlayerDetailsScreen from '../screens/PlayerDetailsScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.card,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: '700',
          fontSize: 20,
        },
        cardStyle: {
          backgroundColor: theme.background,
        },
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          title: 'Sportify',
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={({ navigation }) => ({
          title: 'Team Details',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 16 }}
            >
              <Feather name="arrow-left" size={24} color={theme.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="MatchDetails"
        component={MatchDetailsScreen}
        options={({ navigation }) => ({
          title: 'Match Details',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 16 }}
            >
              <Feather name="arrow-left" size={24} color={theme.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PlayerDetails"
        component={PlayerDetailsScreen}
        options={({ navigation }) => ({
          title: 'Player Details',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 16 }}
            >
              <Feather name="arrow-left" size={24} color={theme.text} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
