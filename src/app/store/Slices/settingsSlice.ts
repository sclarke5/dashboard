import { loadState } from '@/app/helper/localStorage';
import { createSlice } from '@reduxjs/toolkit';

const persistedState = loadState('settings');

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    revenue: persistedState ? persistedState.showRevenue : true,
    profit: persistedState ? persistedState.showProfit : true,
    orders: persistedState ? persistedState.showOrders : true,
    customers: persistedState ? persistedState.showCustomers : true,
  },
  reducers: {
    updateSettings: (state, action) => {
      state.revenue = action.payload.settingsState.showRevenue;
      state.customers  = action.payload.settingsState.showCustomers;
      state.profit  = action.payload.settingsState.showProfit;
      state.orders  = action.payload.settingsState.showOrders;

      // saveState('settings', action.payload.settingsState);
    }
  },
});

export const { 
  updateSettings
} = settingsSlice.actions;

export default settingsSlice.reducer;