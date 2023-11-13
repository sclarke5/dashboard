import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { EditTaskProps, TaskProps } from './types'

export const EditTask = (props: EditTaskProps) => {
  const [formData, setFormData] = useState({ id: '', content: '' });
  const setProjectData = props.setData;
  const { data, currentColumn } = props;

  const handleFormChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;
    
    setFormData((prevState: TaskProps) => ({
      ...prevState,
      [name]: value
    }))
  }
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if(props.task) {
      const newState = {
        ...data,
        tasks: {
          ...data.tasks,
          [props.task.id]: formData
        }
      }

      setProjectData(newState)
      props.toggleDrawer();

    } else if (currentColumn !== null && currentColumn !== undefined) {
      const tasks = Object.keys(data.tasks);
      const taskKey = `task-${tasks.length + 1}`
      const newTask: any = { 
        [taskKey]: { 
          id: taskKey, 
          content: formData.content 
        } 
      }

      const firstColumn = JSON.parse(JSON.stringify(data.columns[currentColumn.id]));

      firstColumn.taskIds.push(taskKey);

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [currentColumn.id]: firstColumn,
        },
        tasks: {
          ...data.tasks,
          ...newTask
        }
      }

      setProjectData(newState)
      props.toggleDrawer();

    } else {
      const tasks = Object.keys(data.tasks);
      const taskKey = `task-${tasks.length + 1}`
      const newTask: any = { 
        [taskKey]: { 
          id: taskKey, 
          content: formData.content 
        } 
      }

      const firstOrdered = data.columnOrder[0];

      const firstColumn = JSON.parse(JSON.stringify(data.columns[firstOrdered]));
      firstColumn.taskIds.push(taskKey);

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [firstOrdered]: firstColumn,
        },
        tasks: {
          ...data.tasks,
          ...newTask
        }
      }

      setProjectData(newState)
      props.toggleDrawer();
    }
  }

  useEffect(() => {
    if(props.task) {
      setFormData(props.task)
    }
  }, [props.task])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    
    <Paper sx={{ padding: '1rem 2rem' }} >
      <Grid container justifyContent='center'>
        <Grid item xs={12} sm={10} md={10}>
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: 600, margin: '0 auto' }}
          >
            <Grid container spacing={3}>
              <Grid item>
                <TextField 
                  onFocus={e => e.currentTarget.select()}
                  required
                  fullWidth
                  autoFocus
                  label="Content"
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                />
              </Grid>
            </Grid>
            <Grid item>
              <Button 
                type="submit" 
                variant="contained"
                color={'primary'}
                >
                Save Changes
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Paper>
  </Box>
  )
}
