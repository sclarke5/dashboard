import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => { 
      return state + 1
    },
    decrement: (state) => state - 1,
  },
});

export const { increment, decrement } = authSlice.actions;
export default authSlice.reducer;