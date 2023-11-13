'use client'

import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { ColumnComponentProps, TaskProps } from './types';
import styles from './Projects.module.scss';
import { Task } from './Task';

export const Column = (props: ColumnComponentProps) => {
  const [columnName, setColumnName] = useState(props.column.title);
  const { data, setData, column } = props;

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if(ev.key === 'Enter' || ev.key === 'Escape') {
      ev.currentTarget.blur();
    }
  }

  const handleColumnNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setColumnName(ev.currentTarget.value)
  }

  const handleColumnNameUpdate = (ev: React.ChangeEvent<HTMLInputElement>) => {
    
    const updatedColumn = JSON.parse(JSON.stringify(data.columns[column.id]));
    updatedColumn.title = columnName;

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [column.id]: updatedColumn
      }
    }

    setData(newState);

  }

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => {
        return (
          <Box 
            sx={{ 
              padding: '2em'
            }}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <input 
                {...provided.dragHandleProps}
                value={columnName}
                onChange={handleColumnNameChange}
                className={styles.columnInput}
                onBlur={handleColumnNameUpdate}
                onKeyDown={handleKeyDown}
              />

              <span {...provided.dragHandleProps}>
                <DragIndicatorIcon />
              </span>
            </Box>
    
            <Droppable 
              droppableId={props.column.id} 
              isDropDisabled={props.disabledFlag} 
              type="task"
            >
              {(provided) => (
                <>
                <Paper 
                  ref={provided.innerRef}
                  sx={{ minHeight: '25rem', padding: '1rem' }}
                  {...provided.droppableProps}
                >
                  <Box>
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
                <Button
                variant='contained'
                color='primary'
                sx={{
                  marginTop: '1rem'
                }}
                onClick={() => props.addTask(props.column)}
              >Add Task</Button>
              </>
              )}
            </Droppable>
          </Box>
        )
      }}
    </Draggable>

  )
}
