import { loadState, saveState } from '@/app/helper/localStorage';
import { createSlice } from '@reduxjs/toolkit';

const persistedState = loadState('theme');

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: persistedState ? persistedState : 'dark'
  },
  reducers: {
    toggleTheme: (state) => { 
      if(state.mode === 'dark') {
        state.mode = 'light';
        console.log('hellow ', state.mode)
        saveState('theme', state.mode)
      } else {
        state.mode = 'dark';
        saveState('theme', state.mode)
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;