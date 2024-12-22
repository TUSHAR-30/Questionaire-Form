// import React from 'react'

// function CategorizeQuestionPreview({ question }) {
//     return (
//         <div className='categorize-container-Preview'>
//             <div className='category-container-Preview'>
//                 {question.categorize.categories.map((category, index) => (
//                     category.trim() && <div key={index} className='category-Preview'>
//                         <div className='category-header-Preview'>{category}</div>
//                         <div className='category-item-Preview'></div>
//                     </div>
//                 ))}
//             </div>
//             <div className='item-container-Preview'>
//                 {question.categorize.items.map((item, index) => (
//                     item.name.trim() && <div key={index} className='item-Preview'>{item.name}</div>
//                 ))}
//             </div>

//         </div>
//     )
// }

// export default CategorizeQuestionPreview




import React, { useContext } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import CreateFormContext from '../../Context/CreateFormContext';
import EditFormContext from '../../Context/EditFormContext';
import { useLocation } from 'react-router-dom';

function CategorizeQuestionPreview({ question, questionIndex }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const { questions, setQuestions } = currentPath === "/dragforms/createform" ? useContext(CreateFormContext) : useContext(EditFormContext);

    function handleDragEnd(result) {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId == "item-container" && destination.droppableId.startsWith("category-")) {
            const droppableIndex = parseInt(destination.droppableId.split("-")[1], 7);
            const updatedQuestions = [...questions];
            const question = updatedQuestions[questionIndex];

            question.categorize.items[source.index].droppedAt=droppableIndex
            setQuestions(questions)
          
        }
    }
    return (
        <div className='categorize-container-Preview'>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className='category-container-Preview'>
                    {question.categorize.categories.map((category, index) => (
                        category.trim() && <div key={index} className='category-Preview'>
                            <div className='category-header-Preview'>{category}</div>
                            <Droppable droppableId={`category-${index}`} direction="vertical">
                                {(provided) => (
                                    <div
                                        className='category-item-Preview'
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {

                                            question.categorize.items.map((item)=>(
                                                item.droppedAt==index && <span className='draggable-item-preview' key={item.name}>{item.name}</span>
                                        ))
                                     }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
                <Droppable droppableId={`item-container`} direction="vertical">
                    {(provided) => (
                        <div
                            className='items-container-preview'
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {question.categorize.items.map((item, index) => (
                                <Draggable key={item.name} draggableId={item.name} index={index}>
                                    {(provided) => (
                                        item.name.trim() &&
                                        <div
                                            key={index}
                                            className={`draggable-item-preview ${item.droppedAt || item.droppedAt===0?"hide":""} `}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >{item.name}</div>
                                    )}

                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}

                </Droppable>

            </DragDropContext>
        </div>
    )
}

export default CategorizeQuestionPreview