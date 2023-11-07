import { createSlice } from '@reduxjs/toolkit';
import trelloData from '@/app/dashboard/projects/trelloData';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    tasks: trelloData.tasks,
    columns: trelloData.columns,
    columnOrder: trelloData.columnOrder
    
  },
  reducers: {
    updateProjects: (state, action) => {
      state.columns = action.payload.data.columns;
      state.columnOrder = action.payload.data.columnOrder;
      state.tasks = action.payload.data.tasks;
    }
  },
});

export const { 
  updateProjects
} = projectsSlice.actions;

export default projectsSlice.reducer;