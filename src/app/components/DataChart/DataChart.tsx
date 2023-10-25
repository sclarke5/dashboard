'use client'

import { months } from '@/app/helper/Util';
import { useTheme } from '@mui/material';
import { Chart, registerables } from 'chart.js';
import { ChartConfiguration } from 'chart.js/dist/types'
import React, { useEffect, useRef } from 'react'
import { darkOptions, lightOptions } from './Themes';

export const DataChart = (props: ChartConfiguration) => {
  const { data, options } = props;
  const chartRef = useRef<HTMLCanvasElement>(null);

  const theme = useTheme();

  const themeOptions = theme.palette.mode === 'dark' ? darkOptions : lightOptions;

  useEffect(() => {
    if(chartRef.current !== null){
      const chart = new Chart(chartRef.current, {
        ...props,
        options: {
          ...options,
          ...themeOptions,
        }
      })
      return () => {
        chart.destroy()
      }
    }
  }, [data])


  return (
    <canvas ref={chartRef} />
  )
}
Chart.register(...registerables)

export default DataChart; 