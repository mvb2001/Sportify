import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import sportsReducer from './slices/sportsSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sports: sportsReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
