import type { Metadata } from 'next'
import './globals.css'
import Provider from './components/Provider'

export const metadata: Metadata = {
  title: 'Administar',
  description: 'Administrate your shit',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
