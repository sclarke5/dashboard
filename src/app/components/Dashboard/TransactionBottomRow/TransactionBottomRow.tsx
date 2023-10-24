import { doughnutChartData } from '@/app/helper/mockData'
import { Grid, Paper } from '@mui/material'
import React from 'react'
import { DataChart } from '../../DataChart'
import styles from './TransactionBottomRow.module.scss'

export const TransactionBottomRow = () => {
  return (
    <Grid gap={4} marginTop={2} container className={styles.bottomRow}>
      <Grid>
        <Paper className={styles.dataCard}>
          <p>Transactions per user type</p>
          <DataChart type='doughnut' data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={styles.dataCard}>
          <p>Transactions per user type</p>
          <DataChart type='doughnut' data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={styles.dataCard}>
          <p>Transactions per user type</p>
          <DataChart type='doughnut' data={doughnutChartData} />
        </Paper>
      </Grid>
      <Grid>
        <Paper className={styles.dataCard}>
          <p>Transactions per user type</p>
          <DataChart type='doughnut' data={doughnutChartData} />
        </Paper>
      </Grid>
    </Grid>
  )
}
