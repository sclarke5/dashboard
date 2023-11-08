'use client'

import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { Header } from './components';
import darkTheme from './theme/darkTheme';
import lightTheme from './theme/lightTheme';

export const ThemeWrapper = ({ children }: any) => {

  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const darkThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...darkTheme
      }),
    [],
  );

  const lightThemeChosen = React.useMemo(
    () =>
      createTheme({
        ...lightTheme
      }),
    [],
  );


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider 
        theme={mode === 'dark' ? darkThemeChosen : lightThemeChosen}>
        <Header ColorModeContext={ColorModeContext} mode={mode} />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider> 
  )
}

export default ThemeWrapper;