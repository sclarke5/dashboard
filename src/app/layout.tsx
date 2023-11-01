import type { Metadata } from 'next'
import AppWrapper from './AppWrapper'

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
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  )
}

export default RootLayout;
