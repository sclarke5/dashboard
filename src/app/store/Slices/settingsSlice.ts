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
      state.revenue = action.payload.updateSettingsObject.showRevenue;
      state.customers  = action.payload.updateSettingsObject.showCustomers;
      state.profit  = action.payload.updateSettingsObject.showProfit;
      state.orders  = action.payload.updateSettingsObject.showOrders;
    }
  },
});

export const { 
  updateSettings
} = settingsSlice.actions;

export default settingsSlice.reducer;