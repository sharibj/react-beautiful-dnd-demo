import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialItems = [
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
    { id: 'item-4', content: 'Item 4' },
    { id: 'item-5', content: 'Item 5' },
    { id: 'item-6', content: 'Item 6' },
    { id: 'item-7', content: 'Item 7' },
    { id: 'item-8', content: 'Item 8' },
    { id: 'item-9', content: 'Item 9' },
    { id: 'item-10', content: 'Item 10' },
];

const App = () => {
    const [items, setItems] = useState(initialItems);

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = Array.from(items);
        const [reorderedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, reorderedItem);

        setItems(reorderedItems);
    };

    const handlePrintItems = () => {
        console.log('Items in new order:');
        items.forEach((item) => console.log(item.content));
    };

    return (
        <div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <textarea
                                                className="hover:text-white hover:bg-black px-6 h-12 font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
                                                value={item.content}
                                                onChange={(e) => {
                                                    const updatedItems = [...items];
                                                    updatedItems[index].content = e.target.value;
                                                    setItems(updatedItems);
                                                }}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button onClick={handlePrintItems} className="mt-4 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
                Print Items in New Order
            </button>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
