'use client'

import { Header } from "./components";
import { Sidemenu } from "./components";
import Dashboard from "./dashboard/page";
import { useSession } from "next-auth/react";

export const Home = () => {
  const { data: session } = useSession()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      {session && (
        <>
          <Sidemenu />
          <Dashboard />
        </>
      )}

    </main>
  )
}

export default Home;