'use client'

import { useRef, useState } from "react";
import { useDrag, useDrop } from 'react-dnd';
import ITEM_TYPE from './types';
import { Window } from "./Window";

const TrelloItem = ({ item, index, moveItem, status }: {
  item: any,
  index: number,
  moveItem: any,
  status: any
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if(dragIndex === hoverIndex) {
        return;
      }

      // @ts-ignore
      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top / 2);
      const mousePosition = monitor.getClientOffset();
      //@ts-ignore
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if(dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { type: ITEM_TYPE, ...item, index },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const [show, setShow] = useState(false);

  const onOpen = () => setShow(true);

  const onClose = () => setShow(false);

  drag(drop(ref))

  return (
     <>
       <div 
         className="" 
         ref={ref} 
         style={{ 
           opacity: isDragging ? 0 : 1 
         }} 
         onClick={onOpen}>
           <div className="color-bar" style={{ 
             backgroundColor: status.color
           }}></div>
           <p className="item-title">{item.content}</p>
           <p className='item-status'>{item.icon}</p>
         </div>
         <Window 
           item={item}
           onClose={onClose}
           show={show}
         />
     </>
  )
}

export { TrelloItem }