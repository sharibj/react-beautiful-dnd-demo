import React, { useState, useRef, useEffect } from 'react';
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
    const containerRef = useRef(null);

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

    const handleAddItem = () => {
        const newItemId = `item-${items.length + 1}`;
        const newItemContent = `Item ${items.length + 1}`;
        const newItems = [...items, { id: newItemId, content: newItemContent }];
        setItems(newItems);

        // Scroll to the bottom
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    };

    useEffect(() => {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, [items]);

    return (
        <div className='grid grid-cols-1 grid-row-2 w-80'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided) => (
                        <div
                            className='grid grid-cols-1 gap-2 self-center justify-center w-80 overflow-y-auto'
                            {...provided.droppableProps}
                            ref={(el) => {
                                containerRef.current = el;
                                provided.innerRef(el);
                            }}
                            style={{ maxHeight: '300px' }}
                        >
                            {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <textarea
                                                className="hover:text-white hover:bg-black px-6 h-12 w-full font-semibold tracking-wider border-2 border-black bg-teal-400 text-black"
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
            <div className="grid grid-cols-2 grid-row-1 w-80 gap-4">
                <button
                    onClick={handlePrintItems}
                    className="mt-4 bg-teal-400 hover:bg-black text-black  hover:text-white font-bold py-2 px-4 tracking-wider border-2 border-black "
                >
                    Print
                </button>
                <button
                    onClick={handleAddItem}
                    className="mt-4 bg-teal-400 hover:bg-black text-black hover:text-white font-bold py-2 px-4 tracking-wider border-2 border-black "
                >
                    +
                </button>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
