'use client'

import { useSession } from "next-auth/react";
import { Box } from "@mui/material";
import { Login } from "@/app/components";
 
const SignIn = () => {
  const { data: session } = useSession()

  return (
    <Box
      sx={{
        marginTop: '5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        minHeight: '10em',
      }}
    >
      <h2 className="text-3xl">{session ? `Welcome, ${session.user?.name}` : "Please log in"}</h2>
      <Login />
      
    </Box>
  )
}

export default SignIn;