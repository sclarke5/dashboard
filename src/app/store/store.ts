import { configureStore } from '@reduxjs/toolkit';
 // Import your reducers
import { authSlice, settingsSlice, projectsSlice } from './Slices';

const store = configureStore({
  reducer: {
    authSlice,
    settingsSlice,
    projectsSlice
    // Add more reducers as needed
  },
});

export default store;