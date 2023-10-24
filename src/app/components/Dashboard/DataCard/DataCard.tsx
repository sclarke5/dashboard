import React from 'react'
import { IconButton, Paper, Tooltip, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import styles from './DataCard.module.scss'

export type DataCardProps = {
  title: string;
  value: string;
  description: string;
}

export const DataCard = (props: DataCardProps) => {
  const { title, value, description } = props;
  return (
    <Paper className={styles.dataCard} sx={{ padding: '1rem', height: '100%' }}>
        <div className={styles.cardHeader} >
          <Typography fontSize={20} color={'lightslategray'}>
            {title}
          </Typography>
          <Tooltip title={
            <Typography fontSize={16}>
              {`${description} which is ${value}`}
            </Typography>
          }
          >
            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>
        <Typography fontSize={26}>{value}</Typography>
      </Paper>
  )
}
