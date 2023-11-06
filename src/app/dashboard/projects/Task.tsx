//@ts-nocheck
'use client'

import React from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Draggable } from '@hello-pangea/dnd';

export const Task = ({ task, index}) => {
  // logic for disabling drag for tasks goes here
  // const isDragDisabled = true;

  return (
    <Draggable 
      draggableId={task.id} 
      index={index} 
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
            {task.content}
        </Box>
      )}
      
    </Draggable>
      
  )
}
