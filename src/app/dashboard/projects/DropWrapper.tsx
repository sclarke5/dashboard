import React from 'react';
import ITEM_TYPE from './types';
import { statuses } from './trelloData';
import { useDrop } from 'react-dnd';

const DropWrapper = ({ onDrop, children, status }: {
  onDrop: any,
  children: any,
  status: any
}) => {
  const [{ isOver}, drop] = useDrop({
    accept: ITEM_TYPE,
    canDrop: (item: any, monitor) => {
      const itemIndex = statuses.findIndex(si => si.status === item.status);
      const statusIndex = statuses.findIndex(si => si.status === status);

      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status)
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })

  return (
    <div ref={drop} className='drop-wrapper'>
      {React.cloneElement(children, { isOver })}
    </div>
  )
}

export { DropWrapper }