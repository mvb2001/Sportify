import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.favorites.find(item => item.idTeam === action.payload.idTeam);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(item => item.idTeam !== action.payload);
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const {
  addFavorite,
  removeFavorite,
  setFavorites,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
