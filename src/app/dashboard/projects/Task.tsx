'use client'

import React from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Draggable } from '@hello-pangea/dnd';
import { TaskComponentProps } from './types';

export const Task = (props: TaskComponentProps) => {
  // logic for disabling drag for tasks goes here
  // const isDragDisabled = true;

  return (
    <Draggable 
      draggableId={props.task.id} 
      index={props.index} 
      // isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Box 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
          sx={{ 
            padding: '1rem',
            border: '1px solid red',
            marginBottom: '1rem',
            borderRadius: '3px',
            backgroundColor: '#000'
          }}
        >
            {props.task.content}
        </Box>
      )}
      
    </Draggable>
      
  )
}
