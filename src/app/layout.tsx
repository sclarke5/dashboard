import type { Metadata } from 'next'
import './globals.css'
import { Provider } from './components'
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
            <CssBaseline />
            {children}
          </ThemeWrapper>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
