import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    isLoggedIn: false,
    adminData: null,
    loading: false,
    error: false
  },
  reducers: {
    loggedin: (state, action) => {
    state.adminData = action.payload;
    state.isLoggedIn = true;
    },
    loginfailure: (state) => {
      state.adminData = null;
      state.isLoggedIn = false;
    },
    loggedOut: (state) => {
      state.adminData = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loggedin, loginfailure, loggedOut, } = adminSlice.actions;
export default adminSlice.reducer;