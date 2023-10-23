'use client'

import { Sidemenu } from "./components";
import Dashboard from "./dashboard/page";
import { useSession } from "next-auth/react";
import styles from './Home.module.scss'

export const Home = () => {
  const { data: session } = useSession();

  return (
    <main className={styles.main}>
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