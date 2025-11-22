// TheSportsDB API Configuration
export const SPORTS_API_KEY = '3'; 
export const SPORTS_API_BASE_URL = 'https://www.thesportsdb.com/api/v1/json';

// DummyJSON API for authentication
export const AUTH_API_BASE_URL = 'https://dummyjson.com';

// Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${AUTH_API_BASE_URL}/auth/login`,
  USER: `${AUTH_API_BASE_URL}/users`,
  
  // Sports endpoints
  LEAGUES: `${SPORTS_API_BASE_URL}/${SPORTS_API_KEY}/all_leagues.php`,
  TEAMS_BY_LEAGUE: (leagueId) => `${SPORTS_API_BASE_URL}/${SPORTS_API_KEY}/lookup_all_teams.php?id=${leagueId}`,
  TEAM_DETAILS: (teamId) => `${SPORTS_API_BASE_URL}/${SPORTS_API_KEY}/lookupteam.php?id=${teamId}`,
  EVENTS_BY_LEAGUE: (leagueId) => `${SPORTS_API_BASE_URL}/${SPORTS_API_KEY}/eventsseason.php?id=${leagueId}&s=2024-2025`,
  SEARCH_TEAMS: (query) => `${SPORTS_API_BASE_URL}/${SPORTS_API_KEY}/searchteams.php?t=${query}`,
  SEARCH_PLAYERS: (query) => `${SPORTS_API_BASE_URL}/${SPORTS_API_KEY}/searchplayers.php?p=${query}`,
  PLAYERS_BY_TEAM: (teamName) => `${SPORTS_API_BASE_URL}/${SPORTS_API_KEY}/searchplayers.php?t=${teamName}`,
};
