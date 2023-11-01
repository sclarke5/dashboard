'use client'

import { 
  updateSettings
} from '@/app/store/Slices/settingsSlice';
import { Box, Button, FormControlLabel, FormGroup, Grid, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const Settings = () => {
  const settingsObject = useSelector((state: any) => {
    return state.settingsSlice;
  })
  const dispatch = useDispatch();

  const [showRevenue, setShowRevenue] = useState(settingsObject.revenue);
  const [showProfit, setShowProfit] = useState(settingsObject.profit);
  const [showOrders, setShowOrders] = useState(settingsObject.orders);
  const [showCustomers, setShowCustomers] = useState(settingsObject.customers);

  const handleShowRevenueChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.currentTarget;
    setShowRevenue(checked);
  }

  const handleShowProfitChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.currentTarget;
    setShowProfit(checked);
  }

  const handleShowOrdersChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.currentTarget;
    setShowOrders(checked);
  }

  const handleShowCustomersChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = ev.currentTarget;
    setShowCustomers(checked);
  }

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const updateSettingsObject = {
      showRevenue,
      showProfit,
      showOrders,
      showCustomers
    }
    
    dispatch(updateSettings({updateSettingsObject}))
  }

  return (
    <>
      <Typography  
        variant='h2' 
        sx={{ 
          marginTop: 10, 
          paddingBottom: 4,
          fontWeight: 600
        }}>Settings</Typography>
      <Box>
        <Typography variant="h4" gutterBottom>Dashboard Features</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={showRevenue}
                      onChange={handleShowRevenueChange}
                    />
                  }
                  label="Revenue"
                />
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={showProfit}
                      onChange={handleShowProfitChange}
                    />
                  }
                  label="Profit"
                />
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={showOrders}
                      onChange={handleShowOrdersChange}
                    />
                  }
                  label="Orders"
                />
                <FormControlLabel 
                  control={
                    <Switch 
                      checked={showCustomers}
                      onChange={handleShowCustomersChange}
                    />
                  }
                  label="Customers"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} sm={6} style={{ marginTop: '2rem' }}>
              <Button 
                type="submit" 
                variant="contained"
                color={'primary'}
                >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  )
}

export default Settings;