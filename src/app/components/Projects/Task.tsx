'use client'

import React, { useState } from 'react';
import { Box, Typography, Drawer, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Draggable } from '@hello-pangea/dnd';
import { TaskComponentProps } from './types';
import { EditTask } from './EditTask';

export const Task = (props: TaskComponentProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { task, index, removeTask } = props;
  // logic for disabling drag for tasks goes here
  // const isDragDisabled = true;

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  const theme = useTheme();

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
            justifyContent: 'space-between',
            display: 'flex',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '3px',
            backgroundColor: theme.palette.primary.light
          }}
        >
          <Typography>
            {task.content}
          </Typography>

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <EditIcon 
              onClick={toggleDrawer}
              sx={{ 
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
            />
            <ClearIcon
              sx={{
                marginTop: '1rem',
                '&:hover': {
                  cursor: 'pointer'
                }
              }}
              onClick={() => removeTask(task)}
            />
          </Box>
          
          <Drawer 
            anchor='right'
            open={openDrawer}
            onClose={toggleDrawer}  
          >
            <EditTask 
              task={task} 
              toggleDrawer={toggleDrawer}
              data={props.data} 
              setData={props.setData} 
            />
          </Drawer>
        </Box>
      )}
    </Draggable>
  )
}
