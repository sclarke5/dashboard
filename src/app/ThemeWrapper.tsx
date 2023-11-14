'use client'

import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import { Header } from './components';
import darkTheme from './theme/darkTheme';
import lightTheme from './theme/lightTheme';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './store/Slices/themeSlice';

export const ThemeWrapper = ({ children }: any) => {

  const theme = useSelector((state: any) => {
    return state.themeSlice;
  })
  const dispatch = useDispatch();

  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

  const [mode, setMode] = React.useState<'light' | 'dark'>(theme.mode);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        dispatch(toggleTheme())
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