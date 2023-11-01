'use client'

import * as React from 'react';
import { useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Person2Icon from "@mui/icons-material/Person2";
import HomeIcon from "@mui/icons-material/Home";
import { Settings } from "@mui/icons-material";
import { useMediaQuery } from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import {
  Divider,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from '@mui/material'

import styles from './Sidemenu.module.scss' 
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const menuItems = [
  {
    route: '/',
    text: 'Home',
    icon: <HomeIcon />
  },
  {
    route: '/dashboard/data',
    text: 'Data',
    icon: <EqualizerIcon />,
  },
  {
    route: '/dashboard/profile',
    text: 'Profile',
    icon: <Person2Icon />,
  },
  {
    route: '/dashboard/settings',
    text: 'Settings',
    icon: <Settings />,
  },
  {
    route: '/signin',
    text: 'Sign Out',
    icon: <ExitToAppIcon />,
  }
]

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const Sidemenu = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const mobileCheck = useMediaQuery('(min-width: 600px');
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLinkClick = (text: string) => {
    if(text === "Sign Out") {
      signOut();
    }
    handleDrawerClose();
  }

  const handleClickAway = () => {
    handleDrawerClose();
  }

  if(session){
    return (
      <ClickAwayListener onClickAway={handleClickAway}>
        <MuiDrawer 
          onClose={() => handleClickAway}
          variant="permanent" 
          open={open}
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              flexShrink: 0,
              whiteSpace: 'nowrap',
              boxSizing: 'border-box',
              zIndex: 500,
              boxShadow: '5px 5px 5px rgba(0, 0, 0, 0.2)',
              top: mobileCheck ? 64 : 56,
              ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
              }),
              ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
              }),
            }
            
          }}
        >
          <div className={styles.drawerHeader}>
            <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
              {theme.direction === 'rtl' || !open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {menuItems.map((item) => {
              return (
                <Link style={{ textDecoration: 'none'}} key={item.text} href={`${item.route}`} onClick={() => handleLinkClick(item.text)}>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      title={item.text}
                      aria-label={item.text}
                      sx={{
                        backgroundColor: pathname === item.route ? theme.palette.primary.main : 'transparent',
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main
                        } 
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.text} sx={{ 
                        opacity: open ? 1 : 0,
                        color: theme.palette.text.primary
                      }} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              )
            })}
          </List>
        </MuiDrawer>
      </ClickAwayListener>
    );
  } else {
    return <></>
  }
}

export default Sidemenu;