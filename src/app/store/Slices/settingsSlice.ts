import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    revenue: true,
    profit: true,
    orders: true,
    customers: true,
  },
  reducers: {
    updateSettings: (state, action) => {
      state.revenue = action.payload.settingsState.showRevenue;
      state.customers  = action.payload.settingsState.showCustomers;
      state.profit  = action.payload.settingsState.showProfit;
      state.orders  = action.payload.settingsState.showOrders;
    }
  },
});

export const { 
  updateSettings
} = settingsSlice.actions;

export default settingsSlice.reducer;