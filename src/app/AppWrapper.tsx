'use client'

import { Provider } from 'react-redux';
import './globals.css';
import store from './store/store';
import styles from './Layout.module.scss';
import { Footer, AuthProvider, Sidemenu } from './components';
import { CssBaseline } from '@mui/material';
import ThemeWrapper from './ThemeWrapper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import React from 'react';

const AppWrapper = ({ children }: { children: React.ReactNode}) => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeWrapper>
          <DndProvider backend={HTML5Backend}>
            <div className={styles.layout}>
              <Sidemenu />
              <CssBaseline />
              {children}
            </div>
          </DndProvider>
            <Footer />
        </ThemeWrapper>
      </AuthProvider>
    </Provider>
  )
}

export default AppWrapper;