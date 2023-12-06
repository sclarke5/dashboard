'use client'

import { selectProjectById, selectAllProjects, updateProject, fetchProjects } from '@/app/store/Slices/projectsSlice';
import { Typography, Container, Grid, Button, Drawer, Tooltip, IconButton, Box, TextField } from "@mui/material"
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, DropResult, DragStart, DragUpdate } from '@hello-pangea/dnd';
import { Column, ColumnProps, EditTask, ProjectData, ProjectsModal } from '@/app/components';
import { useSelector, useDispatch } from "react-redux";
import { ClientOnly } from '@/app/components';
import { UserData } from "@/app/components/Projects/types";
import type { RootState } from '@/app/store/store'

const Projects = () => {
  const userObject = useSelector((state: RootState) => {
    return state.userSlice;
  })

  const projectsObject = useSelector((state: RootState) => {
    return state.projectsSlice.projects;
  })

  const projectsStatus = useSelector((state: RootState) => state.projectsSlice.status)

  const [currentUser, setCurrentUser] = useState(userObject);

  const dispatch = useDispatch();

  const [data, setData] = useState<ProjectData>(
    {
      tasks: {},
      columns: {},
      columnOrder: [],
      archivedTasks: {},
      archivedColumns: {},
      projectType: '',
      name: ''
    }
  );

  const [homeIndex, setHomeIndex] = useState<number>(-1);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentColumn, setCurrentColumn] = useState<ColumnProps | null>(null);
  const [newProject, setNewProject] = useState(false);

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  }

  const handleDragStart = (start: DragStart) => {
    const homeIdx = data.columnOrder.indexOf(start.source.droppableId)

    setHomeIndex(homeIdx);
  }

  const handleDragUpdate = (update: DragUpdate) => {
    // const { destination } = update;
    // const opacity = destination ? destination.index / Object.keys(data.tasks).length : 0;
    // document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  }

  const handleDragEnd = (result: DropResult) => {
    setHomeIndex(-1);

    const { destination, source, draggableId, type } = result;

    if(!destination){
      return;
    }

    if(destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if(type === 'column') {
      const columnOrder = Array.from(data.columnOrder);
      columnOrder.splice(source.index, 1);
      columnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...data,
        columnOrder: columnOrder
      }

      setData(newState);
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {

      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }
  
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn
        }
      }
  
      setData(newState);
      return;

    } else {
      const startTaskIds = Array.from(start.taskIds);
      const finishTaskIds = Array.from(finish.taskIds);

      startTaskIds.splice(source.index, 1);
      finishTaskIds.splice(destination.index, 0, draggableId)

      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }

      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      }

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }

      setData(newState);
      return;
    }
  }

  const handleProjectNameChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.currentTarget;
    const newState = {
      ...data,
      name: value
    }
    setData(newState)
  }

  const addTask = (column: ColumnProps | null = null) => {
    setCurrentColumn(column);
    toggleDrawer();
  }

  const addColumn = () => {
    let columnKey;
    if(data.archivedColumns) {
      const archivedColumns = Object.keys(data.archivedColumns);
      columnKey = `column-${Object.keys(data.columns).length + archivedColumns.length + 1}`
    } else {
      columnKey = `column-${Object.keys(data.columns).length + 1}`
    }

    const newcolumnOrder = JSON.parse(JSON.stringify(data.columnOrder))

    newcolumnOrder.push(columnKey);

    const newColumn = {
      [columnKey]: {
        id: columnKey,
        title: 'Review',
        taskIds: []
      }
    }

    const newState = {
      ...data,
      columnOrder: newcolumnOrder,
      columns: {
        ...data.columns,
        ...newColumn
      }
    }

    setData(newState);
  }

  const handleSubmit = async(ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    if(data && data.name){
      dispatch(updateProject({ data }));
    }
    // dispatch(updateProjects({ data }));

    // try {
    //   await fetch(`/api/users/${currentUser.id}/projects`, {
    //     method: 'PATCH',
    //     body: JSON.stringify({
    //       projectData: data
    //     })
    //   })

    // } catch(err) {
    //   console.log('update user err: ', err)
    // }
  }

  const handleNewProject = (ev: React.MouseEvent) => {
    setNewProject(true);
    setShowModal(true)
  }

  let gridStyling = '';

  if(data && data.columnOrder && data.columnOrder.length > 0) {
    for(let i = 0; i < data.columnOrder.length; i++) {
      gridStyling += '1fr '
    }
  }

  useEffect(() => {
    setCurrentUser(userObject)
  }, [userObject])

  useEffect(() => {

    if(currentUser && currentUser.id !== -1 && projectsStatus) {
      //@ts-ignore
      dispatch(fetchProjects(currentUser))
      
    }

  }, [currentUser, dispatch])

  useEffect(() => {
    if(projectsObject.length === 1){
      setData(projectsObject[0])
    } else if (projectsObject.length > 1) {
      setShowModal(true);
    }
  }, [projectsObject])

  return (
    <ClientOnly>
      <>
        <Typography  
          variant='h1' 
          sx={{ 
            marginTop: 10, 
            paddingBottom: 2,
            fontWeight: 900,
            fontSize: '4rem'
          }}>
            Projects
        </Typography>

        {data && data.projectType && (
          <Box 
            sx={{ 
            width: 'fit-content',
          }}>
            <TextField 
              size="medium"
              sx={{
                ".MuiInputBase-input": {
                  fontSize: '2.5rem',
                  fontWeight: 600,
                  maxWidth: 'fit-content'
                }
              }}
              variant="standard"
              value={data.name}
              onChange={handleProjectNameChange}
            />
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center'
            }}>
          <Typography
            variant='h5'
            sx={{
              marginTop: 2,
              marginBottom: 4,
              fontWeight: 600,
              // position: 'relative'
            }}
          >
            {data.projectType === 'project-strict' ? 'Strict Workflow' : 'Casual Project'}
          </Typography>
          <Tooltip 
            sx={{ marginBottom: 2.5 }}
            title={
              <Typography fontSize={16}>
                {data.projectType === 'project-strict' ? 'Stricter rules for managing professional projects with tight workflows: tasks may only be added to the first column, and columns may not be added, removed, or rearranged' : 'Looser rules for managing personal or more casual projects: tasks may be added to any column, and columns may be added, removed, and rearranged as needed'}
              </Typography>
            }
          >
            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          </Tooltip>
          </Box>
        </Box>
        )}

        {data && data.projectType && (
          <>
            <Grid container spacing={2}>

              {data.projectType === 'project-strict' && (
                <Grid item>
                  <Button 
                    onClick={() => addTask()} 
                    variant="contained"
                    color={'primary'}
                    >
                    Add Task
                  </Button>
                </Grid>
              )}
          
              {data.projectType && data.projectType === 'project-open' && (
                <Grid item>
                  <Button 
                    onClick={addColumn} 
                    variant="contained"
                    color={'primary'}
                    >
                    Add Column
                  </Button>
                </Grid>
              )}
          
              <Grid item>
                <Button 
                  onClick={handleSubmit} 
                  variant="contained"
                  color={'success'}
                  >
                  Save Changes
                </Button>
              </Grid>

              {projectsObject.length > 1 && (
                <Grid item>
                  <Button 
                    onClick={() => setShowModal(true)} 
                    variant="outlined"
                    color={'info'}
                    >
                    Change Project
                  </Button>
                </Grid>
              )}

              <Grid item>
                <Button 
                  onClick={handleNewProject} 
                  variant="contained"
                  color={'info'}
                  >
                  New Project
                </Button>
              </Grid>
            </Grid>

            <DragDropContext
              onDragEnd={handleDragEnd}
              onDragStart={handleDragStart}
              onDragUpdate={handleDragUpdate}
            >
              <Droppable 
                droppableId='all-columns'
                direction="horizontal" 
                type="column"
              >
                {(provided) => {
                  return (
                    <Container 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      sx={{ 
                        display: 'grid', 
                        width: '100%',
                        gridTemplateColumns: gridStyling
                      }}
                      >
                      {data.columnOrder.map((colId, idx) => {
                        const column = data.columns[colId];
                        const tasks = column.taskIds.map(taskId => data.tasks[taskId])

                        return (
                          <Column 
                            key={column.id}
                            column={column}
                            tasks={tasks}
                            disabledFlag={idx > homeIndex + 1 ? true : false} 
                            index={idx}
                            setData={setData}
                            data={data}
                            addTask={addTask}
                          />
                        )
                      })}
                      {provided.placeholder}
                    </Container>
                  )
                }}
              </Droppable>
            </DragDropContext>
          </>
        )}
      </>
 
      
      <Drawer 
        anchor='right'
        open={showDrawer}
        onClose={toggleDrawer}  
        >
        <EditTask 
          toggleDrawer={toggleDrawer}
          setData={setData}
          currentColumn={currentColumn}
          data={data}
        />
      </Drawer>

      <ProjectsModal
        setData={setData}
        show={showModal}
        setShow={setShowModal}
        allProjects={projectsObject}
        currentUser={currentUser}
        newProject={newProject}
        setNewProject={setNewProject}
      />
    </ClientOnly>
  )
}

export default Projects;