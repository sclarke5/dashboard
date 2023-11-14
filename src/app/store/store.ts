import { configureStore } from '@reduxjs/toolkit';
 // Import your reducers
import { themeSlice, settingsSlice, projectsSlice } from './Slices';

const store = configureStore({
  reducer: {
    themeSlice,
    settingsSlice,
    projectsSlice
    // Add more reducers as needed
  },
});

export default store;