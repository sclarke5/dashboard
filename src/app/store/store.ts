import { configureStore } from '@reduxjs/toolkit';
 // Import your reducers
import { authSlice, settingsSlice } from './Slices';

const store = configureStore({
  reducer: {
    authSlice,
    settingsSlice
    // Add more reducers as needed
  },
});

export default store;