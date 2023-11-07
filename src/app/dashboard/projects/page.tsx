'use client'

import { updateProjects } from '@/app/store/Slices/projectsSlice';
import { Typography, Container, Grid, Button } from "@mui/material"
import { useState } from "react";
import { DragDropContext, Droppable, DropResult, DragStart, DragUpdate } from '@hello-pangea/dnd';
import { Column } from './Column';
import { ProjectData } from "./types";
import { useSelector, useDispatch } from "react-redux";

const Projects = () => {
  const projectObject = useSelector((state: any) => {
    return state.projectsSlice;
  })
  const dispatch = useDispatch();

  const [data, setData] = useState<ProjectData>(projectObject);
  const [homeIndex, setHomeIndex] = useState<number>(-1);

  const handleDragStart = (start: DragStart) => {
    const homeIdx = data.columnOrder.indexOf(start.source.droppableId)

    setHomeIndex(homeIdx);
  }

  const handleDragUpdate = (update: DragUpdate) => {
    console.log('update: ', update)
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

  const handleSubmit = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    dispatch(updateProjects({ data }))
  }

  return (
    <>
      <Typography  
        variant='h2' 
        sx={{ 
          marginTop: 10, 
          paddingBottom: 4,
          fontWeight: 600
        }}>
          Projects
      </Typography>
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
                  display: 'flex', 
                  width: '100%',
                  justifyContent: 'space-around' 
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
      <Grid item xs={12} sm={6} style={{ marginTop: '2rem' }}>
        <Button 
          onClick={handleSubmit} 
          variant="contained"
          color={'primary'}
          >
          Save Changes
        </Button>
      </Grid>
    </>
    
  )
}

export default Projects;