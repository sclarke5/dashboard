import type { Metadata } from 'next'
import './globals.css'
import styles from './Layout.module.scss'
import { Footer, Provider, Sidemenu } from './components'
import { CssBaseline } from '@mui/material'

import ThemeWrapper from './ThemeWrapper'

export const metadata: Metadata = {
  title: 'Administar',
  description: 'Administrate your shit',
}

export const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {

  return (
    <html lang="en">
      <body>
        <Provider>
          <ThemeWrapper>
            <div className={styles.layout}>
              <Sidemenu />
              <CssBaseline />
              {children}
              <Footer />
            </div>
          </ThemeWrapper>
          
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
