'use client'

import React from 'react'
import { Box, Grid, Paper } from '@mui/material';
import styles from './Dashboard.module.scss'
import { DataRibbon, TransactionBottomRow, TransactionsPerDay } from '@/app/components';
import { lineChartData } from '@/app/helper/mockData';

const Dashboard = () => {

  return (
    <Box>
      <Grid container gap={4}>
        <DataRibbon />
        
        <TransactionsPerDay data={lineChartData} />        
      </Grid>
      <div>
        <TransactionBottomRow />
      </div>
    </Box>
  )
}

export default Dashboard;