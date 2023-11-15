import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DataCard } from '@/app/components'
import styles from './DataRibbon.module.scss'

export const DataRibbon = () => {
  const dataObjects = [
    {
      title: 'Total Sales',
      description: 'Total sales of all Administar products in the current financial year',
      value: '1,134'
    },
    {
      title: 'Monthly Profit',
      description: 'Total profit for the month',
      value: '$801.34'
    },
    {
      title: 'Net Profit',
      description: 'Total conversions for the month',
      value: '$3,0054.56'
    },
    {
      title: 'Conversions Rate',
      description: 'Total conversions for the month',
      value: '0.61%'
    },
  ]

  return (
    <>
      <Typography  
        variant='h1' 
        sx={{ 
          marginTop: 10, 
          marginBottom: -3,
          fontWeight: 600,
          fontSize: '4rem'
        }}>Dashboard</Typography>
      <Grid container gap={2} className={styles.dataRibbon}>
        {dataObjects.map((obj, idx) => {
          return (
            <Grid key={idx}>
              <DataCard {...obj} />
            </Grid>
          )
        })}
      </Grid>
    
    </>
      
  )
}

export default DataRibbon;