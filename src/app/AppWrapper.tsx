'use client'

import { Provider } from 'react-redux';
import './globals.css'
import store from './store/store';
import styles from './Layout.module.scss'
import { Footer, AuthProvider, Sidemenu } from './components'
import { CssBaseline } from '@mui/material'
import ThemeWrapper from './ThemeWrapper'
import React from 'react';

const AppWrapper = ({ children }: { children: React.ReactNode}) => {
  console.log('store: ', store.getState());

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeWrapper>
          <div className={styles.layout}>
            <Sidemenu />
            <CssBaseline />
            {children}
          </div>
            <Footer />
        </ThemeWrapper>
      </AuthProvider>
    </Provider>
  )
}

export default AppWrapper;