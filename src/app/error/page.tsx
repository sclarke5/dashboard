'use client'

import { useSession } from "next-auth/react";
import { Box } from "@mui/material";
import { Login } from "@/app/components";
 
const Error = () => {
  const { data: session } = useSession()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <h2>{session ? `Welcome, ${session.user?.name}` : "Please log in"}</h2>
      <Login />
      
    </Box>
  )
}

export default Error;