'use client'

import { useSession, signIn, signOut } from "next-auth/react"

export const Login = () => {
  const { data: session } = useSession()
  if(session && session.user) {
    return (
      <>
        Signed in as {session.user.email} <br/>
        <p>Welcome, {session.user.name}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br/>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}

export default Login;