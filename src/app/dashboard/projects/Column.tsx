'use client'

import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ColumnComponentProps, TaskProps } from './types';

import { Task } from './Task';

export const Column = (props: ColumnComponentProps) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => {
        return (
          <Box 
            sx={{ 
              padding: '2em', 
              width: '30%'
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
                {props.column.title}
            </Typography>
    
            <Droppable 
              droppableId={props.column.id} 
              isDropDisabled={props.disabledFlag} 
              type="task"
            >
              {(provided) => (
                <Paper 
                  ref={provided.innerRef}
                  sx={{ minHeight: '25rem' }}
                  {...provided.droppableProps}
                >
                  <Box sx={{ padding: '1rem', minHeight: '5rem' }}>
                    {props.tasks.map((task: TaskProps, idx: number) => {
                      return (
                        <Task 
                          key={task.id} 
                          task={task} 
                          index={idx}
                          data={props.data} 
                          setData={props.setData} 
                        />
                      )
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
