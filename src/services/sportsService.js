import { API_ENDPOINTS } from '../constants/api';

export const sportsService = {
  async getTeamsByLeague(leagueId = '4328') {
   
    try {
      const response = await fetch(API_ENDPOINTS.TEAMS_BY_LEAGUE(leagueId));
      
      if (!response.ok) {
        console.error('API response not OK:', response.status);
        return [];
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Response is not JSON, got:', contentType);
        const text = await response.text();
        console.error('Response text:', text.substring(0, 200));
        return [];
      }
      
      const data = await response.json();
      return Array.isArray(data.teams) ? data.teams : [];
    } catch (error) {
      console.error('Error fetching teams:', error);
      return [];
    }
  },

  async getTeamDetails(teamId) {
    try {
      const response = await fetch(API_ENDPOINTS.TEAM_DETAILS(teamId));
      
      if (!response.ok) {
        console.error('API response not OK:', response.status);
        return null;
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Team details response is not JSON');
        return null;
      }
      
      const data = await response.json();
      return data.teams ? data.teams[0] : null;
    } catch (error) {
      console.error('Error fetching team details:', error);
      return null;
    }
  },

  async getEventsByLeague(leagueId = '4328') {
    try {
      const response = await fetch(API_ENDPOINTS.EVENTS_BY_LEAGUE(leagueId));
      
      if (!response.ok) {
        console.error('API response not OK:', response.status);
        return [];
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Events response is not JSON');
        return [];
      }
      
      const data = await response.json();
      return Array.isArray(data.events) ? data.events : [];
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  async searchTeams(query) {
    try {
      const response = await fetch(API_ENDPOINTS.SEARCH_TEAMS(query));
      
      if (!response.ok) {
        console.error('API response not OK:', response.status);
        return [];
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Search teams response is not JSON');
        return [];
      }
      
      const data = await response.json();
      return data.teams || [];
    } catch (error) {
      console.error('Error searching teams:', error);
      return [];
    }
  },

  async searchPlayers(query) {
    try {
      if (!query || query.trim() === '') {
        return [];
      }
      const response = await fetch(API_ENDPOINTS.SEARCH_PLAYERS(query));
      if (!response.ok) {
        console.error('API response not OK:', response.status);
        return [];
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Search players response is not JSON');
        return [];
      }
      
      const data = await response.json();
      return Array.isArray(data.player) ? data.player : [];
    } catch (error) {
      console.error('Error searching players:', error);
      return [];
    }
  },

  async getPlayersByTeam(teamName) {
    try {
      if (!teamName || teamName.trim() === '') {
        return [];
      }
      const response = await fetch(API_ENDPOINTS.PLAYERS_BY_TEAM(teamName));
      if (!response.ok) {
        console.error('API response not OK:', response.status);
        return [];
      }
      
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Players by team response is not JSON');
        return [];
      }
      
      const data = await response.json();
      return Array.isArray(data.player) ? data.player : [];
    } catch (error) {
      console.error('Error fetching players by team:', error);
      return [];
    }
  },

  async getPopularPlayers() {
    
    const popularNames = ['Messi', 'Ronaldo', 'Neymar', 'Mbappe', 'Haaland'];
    const allPlayers = [];
    
    for (const name of popularNames) {
      try {
        const response = await fetch(API_ENDPOINTS.SEARCH_PLAYERS(name));
        if (!response.ok) {
          console.log(`Failed to fetch players for ${name}:`, response.status);
          continue;
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error(`Popular players response for ${name} is not JSON`);
          continue;
        }
        
        const data = await response.json();
        if (data && Array.isArray(data.player) && data.player.length > 0) {
         
          allPlayers.push(...data.player.slice(0, 3));
        }
      } catch (error) {
        console.log(`Error fetching ${name}:`, error.message);
        
      }
    }
    
    return allPlayers;
  },
};

