'use client'

import React, { useState, useRef } from 'react';
import { Typography } from '@mui/material';
import { data, statuses } from './trelloData';
import { DropWrapper } from './DropWrapper';
import { Column } from './Column';
import { TrelloItem } from './TrelloItem';
import styles from './Projects.module.scss';

const Projects = () => {
  const [items, setItems] = useState(data);

  const onDrop = (item: any, monitor: any, status: any) => {
    const mapping = statuses.find(si => si.status === status);

    setItems(prevState => {
        const newItems = prevState
            .filter(i => i.id !== item.id)
            .concat({ ...item, status, icon: mapping?.icon });
        return [ ...newItems ];
    });
  };

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    const item = items[dragIndex];
    setItems(prevState => {
        const newItems = prevState.filter((i, idx) => idx !== dragIndex);
        newItems.splice(hoverIndex, 0, item);
        return  [ ...newItems ];
    });
};

  return (
    <>
      <Typography 
          variant='h2' 
          sx={{ 
            marginTop: 10, 
            paddingBottom: 4,
            fontWeight: 600
          }}
      >
        Projects
      </Typography>
      <div className={styles.row}>
            {statuses.map(s => {
                return (
                    <div key={s.id} className={styles.columnWrapper}>
                        <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
                        <DropWrapper onDrop={onDrop} status={s.status}>
                            <Column>
                              {items
                                .filter(i => i.status === s.status)
                                .map((i, idx) => <TrelloItem key={i.id} item={i} index={idx} moveItem={moveItem} status={s} 
                              />)
                              }
                            </Column>
                        </DropWrapper>
                    </div>
                );
            })}
        </div>
    </>
    
  )
}

export default Projects;