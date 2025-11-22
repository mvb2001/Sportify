import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teams: [],
  selectedTeam: null,
  events: [],
  loading: false,
  error: null,
};

const sportsSlice = createSlice({
  name: 'sports',
  initialState,
  reducers: {
    fetchTeamsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTeamsSuccess: (state, action) => {
      state.loading = false;
      state.teams = action.payload;
      state.error = null;
    },
    fetchTeamsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedTeam: (state, action) => {
      state.selectedTeam = action.payload;
    },
    fetchEventsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload;
      state.error = null;
    },
    fetchEventsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchTeamsStart,
  fetchTeamsSuccess,
  fetchTeamsFailure,
  setSelectedTeam,
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
  clearError,
} = sportsSlice.actions;

export default sportsSlice.reducer;
