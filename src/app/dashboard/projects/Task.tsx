'use client'

import React, { useState } from 'react';
import { Box, Typography, Drawer, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Draggable } from '@hello-pangea/dnd';
import { TaskComponentProps } from './types';
import { EditTask } from './EditTask';

export const Task = (props: TaskComponentProps) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  // logic for disabling drag for tasks goes here
  // const isDragDisabled = true;

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  }

  const theme = useTheme();

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
            justifyContent: 'space-between',
            display: 'flex',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '3px',
            backgroundColor: theme.palette.primary.light
          }}
        >
          <Typography>
            {props.task.content}
          </Typography>
          <EditIcon 
            onClick={toggleDrawer}
            sx={{ 
              marginLeft: '1rem',
              '&:hover': {
                cursor: 'pointer'
              }
            }}
          />
          <Drawer 
            anchor='right'
            open={openDrawer}
            onClose={toggleDrawer}  
          >
            <EditTask 
              task={props.task} 
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
