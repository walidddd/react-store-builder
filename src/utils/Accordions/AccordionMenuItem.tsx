import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import {
  faAngleDown,
  faAngleRight,
  faBars,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface Child {
  id: string;
  name: string;
}
interface AccordionMenuItemProps {
  children?: Child[];
  className?: string;
  id: string;
  activeMenuId?: string;
  activeMenuBlockId?: string;
  onClickItem?: (sectionId: string) => void;
  onClickBlock?: (blockId: string, sectionId: string) => void;
  onDropBlockItem?: (objectSchemaOrder: any, name: string) => void;
  onDragBlockItem?: (objectSchemaOrder: any, name: string) => void;
  onRemoveBlock?: (blockId: string, sectionId: string) => void;
  name: string;
  parentProvided: any;
  animationWithDrag?: Boolean;
}

const AccordionMenuItem: React.FC<AccordionMenuItemProps> = ({
  className,
  children: childItems,
  activeMenuId,
  id,
  name,
  activeMenuBlockId,
  parentProvided,
  animationWithDrag,
  onClickBlock,
  onDragBlockItem,
  onDropBlockItem,
  onClickItem,
  onRemoveBlock,
}) => {
  // Data
  const [isOpen, setIsOpen] = useState(activeMenuId === id);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<string>('0px');
  const [dynamicClass, setClass] = useState<string>('');
  const [currentDeleteItem, setCurrentDeleteItem] = useState<{
    type: 'section' | 'block';
    id: string;
    parentId?: string;
  } | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      const heightDiv = contentRef.current.scrollHeight
        ? contentRef.current.scrollHeight + 'px'
        : 'max-content';
      setContentHeight(isOpen ? `${heightDiv}` : '0px');
    }
  }, [isOpen]);

  // Methods
  const openAccordion = () => {
    setIsOpen(true);
    if (onClickItem) {
      onClickItem(id);
    }
  };

  const closeAccordion = () => {
    setIsOpen(false);
  };

  const updateSchema = (data: object) => {
    setClass('drop');
    animateDragAndDrop('drop');
    if (onDropBlockItem) onDropBlockItem(data, name);
  };

  const onDragStart = (data: object) => {
    if (onDragBlockItem) onDragBlockItem(data, name);
    setClass('drag');
    setTimeout(() => {
      animateDragAndDrop('drag');
    });
  };

  const animateDragAndDrop = (typeOfEvent: string) => {
    const elHtmlParents: NodeList | null =
      document.querySelectorAll('.layers ul');

    if (animationWithDrag && typeOfEvent === 'drag') {
      if (elHtmlParents)
        elHtmlParents.forEach((el: any) => {
          el.style.opacity = '0.5';
          if (el.classList.contains('drag')) {
            el.style.opacity = '1';
            el.parentElement.parentElement.parentElement.parentElement.style.opacity =
              '1';
          }
        });
    } else if (typeOfEvent === 'drop') {
      if (elHtmlParents)
        elHtmlParents.forEach((el: any) => (el.style.opacity = '1'));
    }
  };

  // Delete Item (Section or Block)
  const deleteSection = (event: { currentTarget: any }) => {
    setCurrentDeleteItem({ type: 'section', id });
    confirmPopup({
      target: event.currentTarget,
      message: 'Do you want to delete this Section?',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,
      reject,
    });
  };

  const deleteBlock = (event: { currentTarget: any }, blockId: string) => {
    setCurrentDeleteItem({ type: 'block', id: blockId, parentId: id });
    confirmPopup({
      target: event.currentTarget,
      message: 'Do you want to delete this Block?',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,
      reject,
    });
  };

  const accept = () => {
    if (currentDeleteItem) {
      if (currentDeleteItem.type === 'section') {
        // Logic to delete the section
        console.log('Section deleted:', currentDeleteItem.id);
      } else if (
        currentDeleteItem.type === 'block' &&
        currentDeleteItem.parentId
      ) {
        if (onRemoveBlock)
          onRemoveBlock(currentDeleteItem.id, currentDeleteItem.parentId);
        console.log('Block deleted:', currentDeleteItem.id);
      }
      setCurrentDeleteItem(null);
    }
  };

  const reject = () => {
    setCurrentDeleteItem(null);
  };

  return (
    <div className={`accordion accordion-menu-item p-0 m-0 `}>
      <div
        className={`accordion-header menu-item ${className} ${activeMenuId === id ? 'active' : ''}`}
        {...parentProvided.dragHandleProps}
      >
        {isOpen ? (
          <button onClick={closeAccordion} className="icon-toggle">
            {(childItems?.length ?? 0) > 0 && (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </button>
        ) : (
          <button className="icon-toggle" onClick={openAccordion}>
            {(childItems?.length ?? 0) > 0 && (
              <FontAwesomeIcon icon={faAngleRight} />
            )}
          </button>
        )}

        {/* parent */}
        <div className="parent-menu-name">
          <FontAwesomeIcon icon={faBars} className="icon-title-item" />
          <h3 onClick={openAccordion}>{name}</h3>
        </div>
        <div className="parent-menu-actions">
          <button onClick={deleteSection}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button onClick={() => console.log('Hide item', id)}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      </div>
      <ConfirmPopup />
      <div
        className="accordion-content children"
        style={{ maxHeight: isOpen ? contentHeight : '0px' }}
        ref={contentRef}
      >
        {/* Iterate over children array */}
        {childItems && (
          <DragDropContext onDragEnd={updateSchema} onDragStart={onDragStart}>
            <Droppable droppableId={`blocksDroppable-${id}`}>
              {(provided, snapshot) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={dynamicClass}
                >
                  {childItems.map((child: Child, index: number) => (
                    <Draggable
                      key={child.id}
                      draggableId={child.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          key={index}
                          className={`accordion-header menu-item menu-child   ${
                            activeMenuBlockId === child.id ? 'active' : ''
                          }`}
                          onClick={() =>
                            onClickBlock && onClickBlock(child.id, id)
                          }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <FontAwesomeIcon
                            icon={faBars}
                            className="icon-title-item"
                          />
                          <h3>{child.name}</h3>
                          <div className="parent-menu-actions">
                            <button
                              onClick={(event) => deleteBlock(event, child.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                            <button
                              onClick={() => console.log('Hide item', child.id)}
                            >
                              <FontAwesomeIcon icon={faEye} />
                            </button>
                          </div>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default AccordionMenuItem;
