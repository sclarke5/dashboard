import { createSlice } from '@reduxjs/toolkit';
import { loadState, saveState } from '@/app/helper/localStorage';
import trelloData from '@/app/helper/trelloData';

const persistedState = loadState('projects');

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    tasks: (persistedState && persistedState.tasks) ? persistedState.tasks : trelloData.tasks,
    columns: (persistedState && persistedState.columns) ? persistedState.columns : trelloData.columns,
    columnOrder: (persistedState && persistedState.columnOrder) ? persistedState.columnOrder : trelloData.columnOrder
    
  },
  reducers: {
    updateProjects: (state, action) => {
      state.columns = action.payload.data.columns;
      state.columnOrder = action.payload.data.columnOrder;
      state.tasks = action.payload.data.tasks;

      saveState('projects', action.payload.data);
    }
  },
});

export const { 
  updateProjects
} = projectsSlice.actions;

export default projectsSlice.reducer;