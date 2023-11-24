'use client'

import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material'
import { Header } from './components';
import darkTheme from './theme/darkTheme';
import lightTheme from './theme/lightTheme';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from './store/Slices/themeSlice';
import { useSession } from 'next-auth/react';
import { updateCurrentUser } from "@/app/store/Slices/userSlice";
import type { RootState } from './store/store';

export const ThemeWrapper = ({ children }: {children: JSX.Element}) => {

  const theme = useSelector((state: RootState) => {
    return state.themeSlice;
  })
  const dispatch = useDispatch();
  const { data: session } = useSession();

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

  useEffect(() => {
    const fetchUser = async() => {
      try {
        const user = await fetch(`/api/users/${session?.user?.email}`, {
          method: 'GET',
        })
  
        return await user.json();
  
      } catch(err) {
        console.log('get user error: ', err)
      }
    }

    if(session) {
      fetchUser().then((res) => {
        dispatch(updateCurrentUser(res));
      });
    }

  }, [session])


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