'use client'

import styled from '@emotion/styled';
import { Button, Paper, useTheme } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'
import styles from './Footer.module.scss';

export const Footer = () => {
  const { data: session } = useSession();
  const theme = useTheme()

  const FooterLink = styled(Link)`
    color: ${theme.palette.text.primary};
  `;

  return (
    <footer className={styles.footer}>
      <Paper sx={{ width: "100%" }} color={'#262626'}>
        <ul role="menu">
          <li>
            <FooterLink href="/">Home</FooterLink>
          </li>
          <li>
            <FooterLink href="/dashboard/data">Data</FooterLink>
          </li>
          <li>
            <FooterLink href="/dashboard/profile">Profile</FooterLink>
          </li>
          <li>
            <FooterLink href="/dashboard/settings">Settings</FooterLink>
          </li>
          <li>
            <FooterLink href="/#terms-and-conditions">Terms & Conditions</FooterLink>
          </li>
          <li>
            <FooterLink href="/#accessibility">Accessibility Statement</FooterLink>
          </li>
          <Button 
            variant='contained'
            color={session ? 'error' : 'success'}
            onClick={() => (session ? signOut() : signIn())}
          >
            {session ? 'Sign Out' : 'Sign In'}
          </Button>
        </ul>
      </Paper>
    </footer>
  )
}
