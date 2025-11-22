import { API_ENDPOINTS } from '../constants/api';

export const authService = {
  async login(username, password) {
    try {
      console.log('Login attempt with username:', username);
      
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log('Login response status:', response.status);
      console.log('Login response data:', data);

      if (!response.ok) {
        const errorMsg = data.message || 'Login failed';
        if (response.status === 400) {
          throw new Error('Invalid credentials. Try:\nUsername: emilys\nPassword: emilyspass');
        }
        throw new Error(errorMsg);
      }

      return {
        user: {
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          image: data.image,
        },
        token: data.accessToken || data.token,
      };
    } catch (error) {
      throw error;
    }
  },

  // Mock register function 
  async register(userData) {
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration
      return {
        user: {
          id: Date.now(),
          username: userData.username,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          image: 'https://via.placeholder.com/150',
        },
        token: 'mock-token-' + Date.now(),
      };
    } catch (error) {
      throw error;
    }
  },
};
