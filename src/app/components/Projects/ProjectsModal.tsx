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
import { Grid, styled, useTheme } from '@mui/material';
import styles from './Projects.module.scss';
import { useDispatch } from 'react-redux';
import { updateProjects } from '@/app/store/Slices/projectsSlice';
import { trelloData } from '@/app/helper/trelloData';


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
  width: '70vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const StyledGridItem = styled(Grid)`
  ${({ theme }) => `
  cursor: pointer;
  transition: ${theme.transitions.create(['color', 'border-color'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    color: ${theme.palette.secondary.main};
    border-color: ${theme.palette.secondary.main};
  }
  `}
`;

export const ProjectsModal = ({ 
  show, 
  setShow, 
  setData,
  allProjects,
  currentUser
  }: 
    {
      show: any, 
      setShow: any,
      setData: any,
      allProjects: any,
      currentUser: any
    }
  ) => {
  const handleClose = () => setShow(false);

  const theme = useTheme();
  // const dispatch = useDispatch();

  const setProjectType = async(ev: React.MouseEvent<HTMLElement>) => {
    const { id } = ev.currentTarget;
    let data;
    if(id === 'project-open') {
      data = {
        ...trelloData.casual,
        projectType: id
      } 
    } else {
        data = {
          ...trelloData.strict,
          projectType: id
        }
      }
    setData(data);
    // dispatch(updateProjects({ data }))
    handleClose();

    const projectData = { 
      ...data, 
      userId: currentUser.id,
      name: 'New Project'
    }

    try {
      await fetch(`/api/users/${currentUser.id}/projects`, {
        method: 'POST',
        body: JSON.stringify({
          projectData: projectData
        })
      })

    } catch(err) {
      console.log('create project err: ', err)
    }
  }

  return (
    <div>      
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={show}
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
            <Typography id="spring-modal-title" variant="h3" sx={{ fontWeight: '600', textAlign: 'center' }} component="h2">
              Choose Template
            </Typography>
            <Typography id="spring-modal-description" variant='h5' sx={{ my: 2, textAlign: 'center' }}>
              Choose from the following templates to generate a project:
            </Typography>
            <Grid container gap={2} sx={{ 
              marginTop: '2rem',
              marginBottom: '2rem',
              width: '100%',
              justifyContent: 'space-around',
              height: '40%'
              }}
            >
              <StyledGridItem 
                item 
                id="project-strict"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  border: '4px solid transparent',
                  width: '40%',
                  padding: '2rem',
                  alignItems: 'center',
                }}
                onClick={setProjectType}
              >
                <Typography variant='h6' sx={{ fontWeight: '600' }}>
                  Strict
                </Typography>
                <InputIcon sx={{ 
                    width: '5rem', 
                    height: '5rem', 
                    marginBottom: '1rem',
                    color: theme.palette.secondary.main
                  }}
                />
                <Typography 
                  variant='body1'
                  sx={{ textAlign: 'center' }}  
                >
                  Users may only add tasks to the first column; columns may not be added, removed or rearranged
                </Typography>
              </StyledGridItem>
              <StyledGridItem 
                item 
                id="project-open"
                className={styles.modalGridItem}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  border: '4px solid transparent',
                  width: '40%',
                  padding: '2rem',
                  alignItems: 'center',
                }}
                onClick={setProjectType}
              >
                <Typography variant='h6' sx={{ fontWeight: '600' }}>
                  Open
                </Typography>
                <AccountTreeIcon 
                  sx={{ 
                    width: '5rem', 
                    height: '5rem', 
                    marginBottom: '1rem',
                    color: theme.palette.secondary.main
                  }}
                />
                <Typography 
                  variant='body1'
                  sx={{ textAlign: 'center' }}  
                >
                  Users may add tasks to any column; columns may be added, rearranged, and removed as needed
                </Typography>
              </StyledGridItem>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}