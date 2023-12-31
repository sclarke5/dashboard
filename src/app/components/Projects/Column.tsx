'use client'

import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography, useTheme } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ClearIcon from '@mui/icons-material/Clear';
import { Draggable, DraggableProvided, Droppable } from '@hello-pangea/dnd';
import { ColumnComponentProps, TaskProps } from './types';
import styles from './Projects.module.scss';
import { Task } from './Task';

export const Column = (props: ColumnComponentProps) => {
  const { data, setData, column } = props;

  const [columnName, setColumnName] = useState(column.title)

  const theme = useTheme();

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

  const handleRemoveColumn = (ev: React.MouseEvent) => {
    const columns = JSON.parse(JSON.stringify(data.columns));
    const columnOrder = JSON.parse(JSON.stringify(data.columnOrder));

    const idx = columnOrder.indexOf(column.id);

    delete columns[column.id];

    columnOrder.splice(idx, 1);
    
    const newState = {
      ...data,
      columnOrder,
      columns,
      archivedColumns: {
        ...data.archivedColumns,
        [column.id]: column
      }
    }

    setData(newState);
  }

  const handleRemoveTask = (task: TaskProps) => {
    const tasks = JSON.parse(JSON.stringify(data.tasks));
    const taskIds = JSON.parse(JSON.stringify(column.taskIds));

    const idx = taskIds.indexOf(task.id);

    taskIds.splice(idx, 1);
    delete tasks[task.id];

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [column.id]: {
          ...column,
          taskIds: taskIds
        }
      },
      tasks: tasks,
      archivedTasks: {
        ...data.archivedTasks,
        [task.id]: task
      }
    }

    setData(newState);
  }

  const renderColumnHeading = (provided: DraggableProvided) => {
    if(data.projectType === 'project-open') {
      return (
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span {...provided.dragHandleProps}>
            <DragIndicatorIcon />
          </span>
          <input 
            {...provided.dragHandleProps}
            name="columnName"
            id={`column-name-${column.id}`}
            value={columnName}
            onChange={handleColumnNameChange}
            className={styles.columnInput}
            onBlur={handleColumnNameUpdate}
            onKeyDown={handleKeyDown}
            style={{
              color: theme.palette.primary.contrastText
            }}
          />
          <span>
            <ClearIcon
              onClick={handleRemoveColumn}
              sx={{
                '&:hover': {
                  cursor: 'pointer',
                }
              }}
            />
          </span>
        </Box>
      )
    } else {
      return (
        <Box>
          <h3 className={styles.columnHeading}>{columnName}</h3>
          <span {...provided.dragHandleProps}>
            <DragIndicatorIcon sx={{display: 'none'}} />
          </span>
        </Box>
        
      )
    }
  }

  useEffect(() => {
    setColumnName(column.title)
  }, [column.title])

  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => {
        return (
          <Box 
            sx={{ 
              padding: '1em'
            }}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {renderColumnHeading(provided)}
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
                          removeTask={handleRemoveTask}
                        />
                      )
                    })}
                  </Box>
                  {provided.placeholder}
                </Paper>
                {data.projectType && data.projectType === 'project-open' && (
                  <Button
                    variant='contained'
                    color='primary'
                    sx={{
                      marginTop: '1rem'
                    }}
                    onClick={() => props.addTask(props.column)}
                  >
                    Add Task
                  </Button>
                )}
              </>
              )}
            </Droppable>
          </Box>
        )
      }}
    </Draggable>

  )
}
