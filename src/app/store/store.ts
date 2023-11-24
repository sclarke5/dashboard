import { configureStore } from '@reduxjs/toolkit';
 // Import your reducers
import { themeSlice, settingsSlice, projectsSlice, userSlice } from './Slices';

const store = configureStore({
  reducer: {
    themeSlice,
    settingsSlice,
    projectsSlice,
    userSlice
    // Add more reducers as needed
  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;