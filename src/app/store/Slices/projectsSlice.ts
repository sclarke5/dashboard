import { createSlice } from '@reduxjs/toolkit';
import { loadState } from '@/app/helper/localStorage';
import { trelloData } from '@/app/helper/trelloData';

const persistedState = loadState('projects');

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    tasks: (persistedState && persistedState.tasks) ? persistedState.tasks : trelloData.strict.tasks,
    columns: (persistedState && persistedState.columns) ? persistedState.columns : trelloData.strict.columns,
    columnOrder: (persistedState && persistedState.columnOrder) ? persistedState.columnOrder : trelloData.strict.columnOrder,
    archivedTasks: (persistedState && persistedState.archivedTasks) ? persistedState.archivedTasks : trelloData.strict.archivedTasks,
    archivedColumns: (persistedState && persistedState.archivedColumns) ? persistedState.archivedColumns : trelloData.strict.archivedColumns,
    projectType: (persistedState && persistedState.projectType) ? persistedState.projectType : trelloData.strict.projectType,
  },
  reducers: {
    updateProjects: (state, action) => {
      state.columns = action.payload.data.columns;
      state.columnOrder = action.payload.data.columnOrder;
      state.tasks = action.payload.data.tasks;
      state.archivedColumns = action.payload.data.archivedColumns;
      state.archivedTasks = action.payload.data.archivedTasks;
      state.projectType = action.payload.data.projectType

      // saveState('projects', action.payload.data);
    }
  },
});

export const { 
  updateProjects
} = projectsSlice.actions;

export default projectsSlice.reducer;