import React, { FC, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import AccordionMenuItem from '../../../../utils/Accordions/AccordionMenuItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { DefaultSchemaValue } from '../../../../helpers/interfaces';

interface LayersMenuProps {
  // typeOfDraggable >> block or section
  onClickItem?: (itemObjectUpdate: object) => void;
  onDropItem?: (schemaValues: object) => void;
  onDragBlock?: () => void;
  onDragSection?: () => void;
  dragUpdates?: (newSchema: object) => void;
  className?: string;
  id: string;
  schemaValues: DefaultSchemaValue;
  title?: string;
}

const LayersMenu: FC<LayersMenuProps> = ({
  onClickItem,
  onDropItem,
  onDragBlock,
  onDragSection,
  dragUpdates,
  className,
  id,
  schemaValues,
  title,
}) => {
  // Data
  const { section: sectionActive } = useSelector((state: RootState) => {
    return state.urlQueryControlSlice;
  });
  const { block: activeMenuBlockId } = useSelector((state: RootState) => {
    return state.urlQueryControlSlice;
  });
  const [dynamicClass, setClass] = useState<string>('');

  // Sure the order key has object
  let schemaValuesLayers: {
    sections: any;
    order: Array<string>;
  } = { ...schemaValues, order: [] };
  if (!schemaValues.order) {
    schemaValuesLayers.order = Object.keys(schemaValuesLayers.sections);
  } else {
    schemaValuesLayers.order = schemaValues.order;
  }

  // Methods
  // Update section schema values
  const updateSchemaSection = (orderObject: any) => {
    setClass('drop');
    if (orderObject.destination) {
      console.log(orderObject);
      const destinationIndex = orderObject.destination.index;
      const arrayOrder = [...schemaValuesLayers.order];
      // Remove the element from the array based on the source index
      const [removedElement] = arrayOrder.splice(orderObject.source.index, 1);

      // Insert the removed element at the destination index
      arrayOrder.splice(destinationIndex, 0, removedElement);

      if (onDropItem) {
        const newSchema = {
          ...schemaValuesLayers,
          order: arrayOrder,
          destinationIndex: destinationIndex,
        };
        onDropItem(newSchema);
      }
    }
  };

  const onDragUpdate = (orderObject: any) => {
    if (orderObject.destination) {
      const destinationIndex = orderObject.destination.index;
      const arrayOrder = [...schemaValuesLayers.order];
      // Remove the element from the array based on the source index
      const [removedElement] = arrayOrder.splice(orderObject.source.index, 1);

      // Insert the removed element at the destination index
      arrayOrder.splice(destinationIndex, 0, removedElement);

      if (dragUpdates) {
        const newSchema = {
          ...schemaValuesLayers,
          order: arrayOrder,
          destinationIndex: destinationIndex,
        };
        dragUpdates(newSchema);
      }
    }
  };

  // Update section schema blocks
  const updateSchemaBlocks = (orderObject: any, name: string) => {
    setClass('drop');
    console.log(orderObject, name, 'name');
    if (orderObject.destination) {
      const destinationIndex = orderObject.destination.index;
      const currentSection = schemaValuesLayers.sections[name];
      const arrayOrder = [...currentSection.block_order]; // Create a new array

      const removedElement = arrayOrder.splice(orderObject.source.index, 1)[0];
      arrayOrder.splice(destinationIndex, 0, removedElement);
      if (onDropItem) {
        const newSchema = {
          ...schemaValuesLayers,
          sections: {
            ...schemaValuesLayers.sections,
            [name]: {
              ...currentSection,
              block_order: arrayOrder,
            },
          },
        };
        onDropItem(newSchema);
      }
    }
  };

  // Animate when change section
  const onDragSectionStart = () => {
    if (onDragSection) {
      onDragSection();
    }

    setClass('drag');
  };

  const onClickSection = (id: string) => {
    // sendMessageToIframe({ action: 'select', itemId: id, type: 'section' });
    if (onClickItem)
      onClickItem({
        section: id,
        block: null,
      });
  };

  const onClickBlock = (id: string, idSection: string) => {
    console.log(id);
    // sendMessageToIframe({ action: 'select', itemId: id, type: 'block' });
    if (onClickItem) {
      onClickItem({
        block: id,
        section: idSection,
      });
    }
  };

  // Getters
  // Getter blocks
  const getBlocksForThisSection = (sectionName: string) => {
    const blockOrderArray =
      schemaValuesLayers.sections[sectionName]?.block_order;

    if (!blockOrderArray) {
      return [];
    }

    const transformedBlockOrder = blockOrderArray.map((block: string) => {
      // Regular expressions to match the IDs
      const numericIdPattern = /^\d+$/;
      const uuidPattern =
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

      let name = block;

      // Check if the block matches any of the patterns
      if (numericIdPattern.test(block) || uuidPattern.test(block)) {
        const typeOfBlock =
          schemaValuesLayers.sections[sectionName].blocks[block]?.type;

        name = typeOfBlock;
      }

      return {
        id: block,
        name: name,
      };
    });

    return transformedBlockOrder;
  };

  // Getter type of sections
  const getTypeOfSection = (sectionName: string) => {
    return schemaValuesLayers.sections[sectionName]?.type;
  };

  return (
    <div className={`layers ${className} `}>
      {title && <h3 className="layers-title">{title}</h3>}
      <DragDropContext
        onDragEnd={updateSchemaSection}
        onDragStart={onDragSectionStart}
        onDragUpdate={onDragUpdate}
      >
        <Droppable droppableId={id}>
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={dynamicClass}
            >
              {schemaValuesLayers?.order.map((item: any, index: any) => (
                <Draggable
                  key={getTypeOfSection(item)}
                  draggableId={getTypeOfSection(item)}
                  index={index}
                >
                  {(provided) => (
                    <li ref={provided.innerRef} {...provided.draggableProps}>
                      <AccordionMenuItem
                        name={item}
                        id={getTypeOfSection(item)} // Ensure that this id matches the unique identifier of your draggable item
                        children={getBlocksForThisSection(item)}
                        activeMenuId={sectionActive}
                        activeMenuBlockId={activeMenuBlockId}
                        parentProvided={provided}
                        animationWithDrag={true}
                        onClickItem={onClickSection}
                        onClickBlock={onClickBlock}
                        onDropBlockItem={updateSchemaBlocks}
                        onDragBlockItem={onDragBlock}
                      />
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default LayersMenu;
