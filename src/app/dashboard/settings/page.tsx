'use client'

import ClientOnly from '@/app/clientOnly';
import { updateSettings } from '@/app/store/Slices/settingsSlice';
import { Box, Button, FormControlLabel, FormGroup, Grid, Switch, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Settings = () => {
  const settingsObject = useSelector((state: any) => {
    return state.settingsSlice;
  })
  const dispatch = useDispatch();

  const [settingsState, setSettingsState] = useState({
    showRevenue: settingsObject.revenue,
    showProfit: settingsObject.profit,
    showOrders: settingsObject.orders,
    showCustomers: settingsObject.customers
  })

  const handleSettingToggle = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = ev.currentTarget;
    setSettingsState((prevState) => ({
      ...prevState,
      [name]: checked
    }))
  }

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    dispatch(updateSettings({ settingsState }))
  }

  return (
    <ClientOnly>
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
                      name="showRevenue"
                      checked={settingsState.showRevenue}
                      onChange={handleSettingToggle}
                    />
                  }
                  label="Revenue"
                />
                <FormControlLabel 
                  control={
                    <Switch 
                      name='showProfit'
                      checked={settingsState.showProfit}
                      onChange={handleSettingToggle}
                    />
                  }
                  label="Profit"
                />
                <FormControlLabel 
                  control={
                    <Switch 
                      name='showOrders'
                      checked={settingsState.showOrders}
                      onChange={handleSettingToggle}
                    />
                  }
                  label="Orders"
                />
                <FormControlLabel 
                  control={
                    <Switch 
                      name="showCustomers"
                      checked={settingsState.showCustomers}
                      onChange={handleSettingToggle}
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
    </ClientOnly>
  )
}

export default Settings;