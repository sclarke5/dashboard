import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { EditTaskProps, TaskProps } from './types'

export const EditTask = (props: EditTaskProps) => {
  const [formData, setFormData] = useState(props.task);
  const setProjectData = props.setData;
  const data = props.data

  const handleFormChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;
    
    setFormData((prevState: TaskProps) => ({
      ...prevState,
      [name]: value
    }))
  }
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newState = {
      ...data,
      tasks: {
        ...data.tasks,
        [props.task.id]: formData
      }
    }
    setProjectData(newState)
    props.toggleDrawer();
  }

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
                  required
                  fullWidth
                  label="Content"
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                />
              </Grid>
              {/* <Grid item>
                <TextField 
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  // value={formData.lastName}
                  onChange={handleFormChange}
                />
              </Grid> */}
            </Grid>
            <Grid item xs={12} sm={6} style={{ marginTop: '2rem' }}>
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
