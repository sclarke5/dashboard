'use client'

import { Card, Grid, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import { DataChart } from '@/app/components';
import styles from './TransactionsPerDay.module.scss'


export const TransactionsPerDay = (props: any) => {
  const { data } = props;
  const theme = useTheme();

  return (
    <Grid container gap={2} className={styles.wrapper} >
      <Paper className={styles.transactions}>
        <div className={styles.chart}>
          <Typography variant="h5">Transactions per Day</Typography>
          <DataChart data={data} type="line" />
        </div>
        <div className={styles.cardWrapper}>

          <Card className={styles.card} variant="outlined">
            <div className={styles.cardTitle}>
              <Typography>Total Products</Typography>
            </div>
            <div className={styles.cardValue}>
              <Typography>1.275</Typography>
              <Typography color={theme.palette.success.main} fontSize={14}>428.7%</Typography>
            </div>
          </Card>

          <Card className={styles.card} variant="outlined">
            <div className={styles.cardTitle}>
              <Typography>Buy-to-detail</Typography>
            </div>
            <div className={styles.cardValue}>
              <Typography>4.40%</Typography>
              <Typography color={theme.palette.success.main} fontSize={14}>889.4%</Typography>
            </div>
          </Card>

          <Card className={styles.card} variant="outlined">
            <div className={styles.cardTitle}>
              <Typography>Refunds</Typography>
            </div>
            <div className={styles.cardValue}>
              <Typography>0</Typography>
              <Typography color={theme.palette.success.main} fontSize={14}>0</Typography>
            </div>
          </Card>
        </div>
      </Paper>
    </Grid>
  )
}
