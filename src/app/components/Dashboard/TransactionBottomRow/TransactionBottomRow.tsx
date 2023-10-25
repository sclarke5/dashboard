import { doughnutChartData } from '@/app/helper/mockData'
import { Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { DataChart } from '../../DataChart'
import styles from './TransactionBottomRow.module.scss'

export const TransactionBottomRow = () => {
  return (
    <Grid gap={4} marginTop={2} container className={styles.bottomRow}>
      <Grid>
        <Paper className={styles.dataCard}>
          <Typography sx={{ padding: 1.5 }} variant="h6">Transactions per user type</Typography>
          <DataChart type='doughnut' data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={styles.dataCard}>
        <Typography sx={{ padding: 1.5 }}  variant="h6">Transactions per user type</Typography>
          <DataChart type='doughnut' data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={styles.dataCard}>
        <Typography sx={{ padding: 1.5 }}  variant="h6">Transactions per user type</Typography>
          <DataChart type='doughnut' data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={styles.dataCard}>
        <Typography sx={{ padding: 1.5 }}  variant="h6">Transactions per user type</Typography>
          <DataChart type='doughnut' data={doughnutChartData} />
        </Paper>
      </Grid>
    </Grid>
  )
}
