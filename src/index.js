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
    const [deletionIndex, setDeletionIndex] = useState(-1);
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
        const mergedItems = items.map((item) => item.content).join('\n----\n');
        console.log(mergedItems);
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

    const handleDelete = (index) => {
        if (deletionIndex === index) {
            const updatedItems = items.filter((_, i) => i !== index);
            setItems(updatedItems);
            setDeletionIndex(-1);
        } else {
            setDeletionIndex(index);
        }
    };


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
                                            className="flex items-center bg-teal-100 mb-2 p-2 rounded-lg"
                                        >
                                            <div
                                                className={`mr-2 text-center self-center text-lg cursor-pointer ${deletionIndex === index ? 'text-red-500 text-xl font-bold' : 'text-black'
                                                    }`}
                                                onClick={() => handleDelete(index)}
                                            >&#x2715;</div>
                                            <textarea
                                                className={`hover:text-white hover:bg-black px-6 h-12 w-full font-semibold tracking-wider border-2 bg-teal-400 ${deletionIndex === index ? 'border-red-500 text-red-500' : 'border-black text-black'
                                                    }`}
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
                    Upload
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
