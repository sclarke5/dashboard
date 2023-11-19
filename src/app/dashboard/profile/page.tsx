'use client'

import { Avatar, Box, Button, Grid, Paper, TextField, Typography, useTheme } from '@mui/material';
import { useSession } from 'next-auth/react';
import React, { FormEvent, useEffect, useState } from 'react';

const Profile = () => {
  const { data: session } = useSession();

  const [retrievedData, setRetrievedData] = useState({
    name: '',
    email: ''
  })

  const [formData, setFormData] = useState({
    fullName: retrievedData.name,
    email: retrievedData.email,
  })

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    console.log('submitting data: ', formData);
  }

  const handleFormChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.currentTarget;
    
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const user = await fetch(`/api/users/${session?.user?.email}`, {
          method: 'GET',
        })

        const data = await user.json();
        console.log('data res: ', data)

        setRetrievedData(data);
  
      } catch(err) {
        console.log('err: ', err)
      }
    }

    fetchUser();


  }, [session])

  useEffect(() => {
    setFormData({
      fullName: retrievedData.name,
      email: retrievedData.email
    })

  }, [retrievedData])

  return (
    <>
      <Typography  
        variant='h1' 
        sx={{ 
          marginTop: 10, 
          paddingBottom: 4,
          fontWeight: 600,
          fontSize: '4rem'
        }}>Profile</Typography>
      <Box>
        <Typography variant='h4' sx={{ paddingBottom: 4, fontWeight: 500 }}>
          Hey {session ? session?.user?.name : 'User'}, welcome to your profile 
        </Typography>
        <Paper sx={{ padding: '3rem 3rem' }} >
          <Grid container justifyContent='center'>
            <Grid item xs={12} sm={10} md={10}>
              <Box display='flex' flexDirection='column' alignItems='center'>
                <Avatar
                  sx={{
                    height: 100,
                    width: 100,
                    marginBottom: 5,
                  }}
                  src={session?.user?.image as string}
                />
              </Box>
              <form
                onSubmit={handleSubmit}
                style={{ maxWidth: 600, margin: '0 auto' }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      required
                      fullWidth
                      label="Full Name"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleFormChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField 
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={6} style={{ marginTop: '2rem' }}>
                  <Button 
                    type="submit" 
                    variant="contained"
                    color={'success'}
                    >
                    Save Changes
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  )
}

export default Profile;