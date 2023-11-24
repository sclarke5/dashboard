import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: -1,
    name: '',
    email: ''
  },
  reducers: {
    updateCurrentUser: (state, action) => {
      state.id = action.payload.id,
      state.name = action.payload.name,
      state.email = action.payload.email
    }
    
  },
});

export const { 
  updateCurrentUser
} = userSlice.actions;

export default userSlice.reducer;