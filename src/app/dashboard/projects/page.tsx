'use client'

import { updateProjects } from '@/app/store/Slices/projectsSlice';
import { Typography, Container, Grid, Button, Drawer } from "@mui/material"
import { useState } from "react";
import { DragDropContext, Droppable, DropResult, DragStart, DragUpdate } from '@hello-pangea/dnd';
import { Column } from './Column';
import { EditTask } from './EditTask';
import { ProjectData } from "./types";
import { useSelector, useDispatch } from "react-redux";
import ClientOnly from '@/app/clientOnly';

const Projects = () => {
  const projectObject = useSelector((state: any) => {
    return state.projectsSlice;
  })
  const dispatch = useDispatch();

  const [data, setData] = useState<ProjectData>(projectObject);
  const [homeIndex, setHomeIndex] = useState<number>(-1);
  const [show, setShow] = useState(false);

  const toggleDrawer = () => {
    setShow(!show);
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

  const addTask = () => {
    toggleDrawer()
  }

  const addColumn = () => {
    const columnKey = `column-${Object.keys(data.columns).length + 1}`

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

  const handleSubmit = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    dispatch(updateProjects({ data }));
  }

  let gridStyling = '';

  for(let i = 0; i < data.columnOrder.length; i++) {
    gridStyling += '1fr '
  }

  return (
    <ClientOnly>
      <Typography  
        variant='h2' 
        sx={{ 
          marginTop: 10, 
          paddingBottom: 4,
          fontWeight: 600
        }}>
          Projects
      </Typography>

      <Grid container spacing={2}>
        <Grid item>
          <Button 
            onClick={addTask} 
            variant="contained"
            color={'primary'}
            >
            Add Task
          </Button>
        </Grid>
        <Grid item>
          <Button 
            onClick={addColumn} 
            variant="contained"
            color={'primary'}
            >
            Add Column
          </Button>
        </Grid>
        <Grid item>
          <Button 
            onClick={handleSubmit} 
            variant="contained"
            color={'success'}
            >
            Save Changes
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
                    />
                  )
                })}
                {provided.placeholder}
              </Container>
            )
          }}
        </Droppable>
      </DragDropContext>
      
      <Drawer 
        anchor='right'
        open={show}
        onClose={toggleDrawer}  
        >
        <EditTask 
          toggleDrawer={toggleDrawer}
          setData={setData}
          data={data}
        />
      </Drawer>
    </ClientOnly>
  )
}

export default Projects;