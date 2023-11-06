//@ts-nocheck
'use client'

import React, { useEffect, useState } from 'react'
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Draggable, Droppable } from '@hello-pangea/dnd';

import { Task } from './Task';

export const Column = ({ column, tasks, disabledFlag, index }: { column: any, tasks: any }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => {
        return (
          <Box 
            sx={{ 
              padding: '2em', 
              minWidth: '30%' 
            }}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Typography 
              variant='h4'
              sx={{ 
                paddingBottom: 4,
                fontWeight: 600
              }}
              {...provided.dragHandleProps}
              >
                {column.title}
            </Typography>
    
            <Droppable 
              droppableId={column.id} 
              isDropDisabled={disabledFlag} 
              type="task"
            >
              {(provided) => (
                <Paper 
                  ref={provided.innerRef}
                  sx={{ minHeight: '25rem' }}
                  {...provided.droppableProps}
                >
                  <Box sx={{ padding: '1rem' }}>
                    {tasks.map((task, idx) => {
                      return <Task key={task.id} task={task} index={idx} />
                    })}
                  </Box>
                  {provided.placeholder}
                </Paper> 
              )}
            </Droppable>
          </Box>
        )
      }}
    </Draggable>

  )
}
