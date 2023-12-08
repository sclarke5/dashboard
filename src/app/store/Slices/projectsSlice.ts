import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
    currentProject: null
  },
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    getCurrentProject: (state) => {
      if(state.currentProject !== null) {
        return state.currentProject;
      }
    },
    projectAdded: {
      reducer(state: any, action: any) {
        state.projects.push(action.payload);
      },
      prepare(projectData) {
        return {
          payload: {
            projectData
          }
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.projects = state.projects.concat(action.payload);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed'
        //@ts-ignore
        state.error = action.error.message
      })
      .addCase(addNewProject.fulfilled, (state: any, action: any) => {
        state.projects.push(action.payload)
        state.currentProject = action.payload;
      }) 
      .addCase(updateProject.fulfilled, (state: any, action: any) => {
        let projIdx;
        for(let i = 0; i < state.projects.length; i++){
          if(state.projects[i].id === action.payload.id) {
            projIdx = i;
          }
        }
        state.projects.splice(projIdx, 1, action.payload)
        state.currentProject = action.payload;
      })
  }
});

export const { 
  projectAdded,
  setCurrentProject,
  getCurrentProject
} = projectsSlice.actions;

export const addNewProject = createAsyncThunk('projects/addNewProject', async (projectData: any, currentUser: any) => {

  try {
    const createdProject = await fetch(`/api/users/${currentUser.id}/projects`, {
      method: 'POST',
      body: JSON.stringify({
        projectData: projectData
      })
    })

    const data = await createdProject.json();

    console.log('POST DATA ', data)

    const newState = {
      ...projectData,
      id: data.id
    }

    return newState;

  } catch(err) {
    console.log('create project err: ', err)
  }
})

export const updateProject = createAsyncThunk('projects/updateProject', async(projectData: any) => {
  const { currentUser, data } = projectData
  
  console.log('patchData ', data)

    try {
      const patchedProject = await fetch(`/api/users/${currentUser.id}/projects`, {
        method: 'PATCH',
        body: JSON.stringify({
          projectData: data
        })
      })

      const patchData = await patchedProject.json();

      return patchData;


    } catch(err) {
      console.log('update user err: ', err)
    }

})

export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (currentUser: any) => {
  try {
    const projects = await fetch(`/api/users/${currentUser.id}/projects`, {
      method: 'GET',
    })

    const data = await projects.json();

    return data;

  } catch(err) {
    console.log('fetch project  err: ', err)
  }
})

export default projectsSlice.reducer;
