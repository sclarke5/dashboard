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
import { ProjectData } from '.';
import { UserData } from './types';


interface FadeProps {
  children: React.ReactElement;
  in?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
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
  currentUser,
  newProject,
  setNewProject
  }: 
    {
      show: boolean, 
      setShow: React.Dispatch<React.SetStateAction<boolean>>,
      setData: React.Dispatch<React.SetStateAction<ProjectData>>,
      allProjects: ProjectData[],
      currentUser: UserData,
      newProject: boolean,
      setNewProject: React.Dispatch<React.SetStateAction<boolean>>,
    }
  ) => {
  
  const handleClose = () => {
    if(newProject) {
      setNewProject(false)
    }
    setShow(false);
  }

  const theme = useTheme();
  // const dispatch = useDispatch();

  const loadProject = (ev: React.MouseEvent) => {
    ev.preventDefault();

    const { id } = ev.currentTarget;

    const projectId = parseInt(id.replace('project-', ''));

    const selectedProject = allProjects.find((proj: ProjectData) => {
      return proj.id === projectId
    })

    if(selectedProject) {
      setData(selectedProject);
    }

    handleClose()
  }

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
      const createdProject = await fetch(`/api/users/${currentUser.id}/projects`, {
        method: 'POST',
        body: JSON.stringify({
          projectData: projectData
        })
      })

      const obj = await createdProject.json();

      const newState = {
        ...data,
        id: obj.id
      }

      setData(newState)

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
              {allProjects.length > 1 && !newProject ? 'Choose Project' : 'Choose Template' }
            </Typography>
            <Typography id="spring-modal-description" variant='h5' sx={{ my: 2, textAlign: 'center' }}>
              {allProjects.length > 1 && !newProject ? 'Choose from your existing projects' : 'Choose from the following templates to generate a project:' }
            </Typography>
            <Grid container gap={2} sx={{ 
              marginTop: '2rem',
              marginBottom: '2rem',
              width: '100%',
              justifyContent: 'space-around',
              height: '40%'
              }}
            >
              {(allProjects.length === 0 || newProject) && (
                <>
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
                </>
              )}

              {allProjects.length > 1 && !newProject && (
                allProjects.map((project: ProjectData) => {
                  return (
                    <StyledGridItem
                      key={project.id} 
                      item 
                      id={`project-${project.id}`}
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
                      onClick={loadProject}
                    >
                      <Typography variant='h6' sx={{ fontWeight: '600' }}>
                        {project.name}
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
                        Type: {project.projectType === 'project-strict' ? 'Strict' : 'Casual'}
                      </Typography>
                    </StyledGridItem>
                  )
                })
              )}
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}