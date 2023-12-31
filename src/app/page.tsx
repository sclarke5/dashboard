'use client'

import  Dashboard from "./dashboard/page";
import { useSession } from "next-auth/react";
import styles from './Layout.module.scss'

const Home = () => {
  const { data: session } = useSession();

  return (
    <main 
      className={styles.main}
    >
      {session && (
        <>
          <Dashboard />
        </>
      )}
    </main>
  )
}

export default Home;