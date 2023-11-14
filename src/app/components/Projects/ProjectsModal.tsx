'use client'

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InputIcon from '@mui/icons-material/Input';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { Grid } from '@mui/material';

interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: any;
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing: boolean) => void;
  ownerState?: any;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null as any, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null as any, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ProjectsModal = ({ 
  show, 
  setShow, 
  data, 
  setData 
  }: 
    {
      show: any, 
      setShow: any, 
      data: any, 
      setData: any 
    }
  ) => {
  const handleClose = () => setShow(false);

  const setProjectType = (ev: React.MouseEvent<HTMLElement>) => {
    const { id } = ev.currentTarget;
    const newState = {
      ...data,
      projectType: id
    }

    setData(newState);
    handleClose();
  }

  return (
    <div>      
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={show}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={show}>
          <Box sx={style}>
            <Typography id="spring-modal-title" variant="h4" component="h2">
              Choose Template
            </Typography>
            <Typography id="spring-modal-description" variant='subtitle1' sx={{ m: 2 }}>
              Choose from the following templates to generate a project:
            </Typography>
            <Grid container sx={{ 
              marginTop: '2rem',
              marginBottom: '2rem',
              width: '100%',
              justifyContent: 'space-around',
              height: '50%'
              }}
            >
              <Grid 
                item 
                id="project-strict"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    cursor: 'pointer',
                  }
                }}
                onClick={setProjectType}
              >
                <InputIcon sx={{ 
                  width: '5rem', height: '5rem', marginBottom: '1rem' 
                  }} 
                />
                <Typography variant='body1'>
                  Strict
                </Typography>
              </Grid>
              <Grid 
                item 
                id="project-open"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    cursor: 'pointer',
                  }
                }}
                onClick={setProjectType}
              >
                <AccountTreeIcon 
                  sx={{ width: '5rem', height: '5rem', marginBottom: '1rem' }}
                />
                <Typography variant='body1'>
                  Open
                </Typography>
              </Grid>
              <Grid 
                item 
                id="project-casual"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  '&:hover': {
                    cursor: 'pointer',
                  }
                }}
                onClick={setProjectType}
              >
                <ChecklistIcon sx={{ 
                  width: '5rem', height: '5rem', marginBottom: '1rem' 
                  }} 
                />
                <Typography variant='body1'>
                  Casual
                </Typography>
              </Grid>
            </Grid>

          </Box>
        </Fade>
      </Modal>
    </div>
  );
}