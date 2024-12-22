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




import React, { useContext, useEffect } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import CreateFormContext from '../../Context/CreateFormContext';
import EditFormContext from '../../Context/EditFormContext';
import { useLocation } from 'react-router-dom';

function CategorizeQuestionPreview({ question, questionIndex , isDragEnabled }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const { questions, setQuestions } = currentPath === "/dragforms/createform" ? useContext(CreateFormContext) : useContext(EditFormContext);

    function handleDragEnd(result) {
        if (!result.destination) return;

        const { source, destination } = result;
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];

        if (source.droppableId == "item-container" && destination.droppableId.startsWith("category-")) {
            const droppableIndex = parseInt(destination.droppableId.split("-")[1], 7);
            question.categorize.items[source.index].droppedAt = droppableIndex
            setQuestions(questions)
        }
        else if( source.droppableId.startsWith("category-") && destination.droppableId == "item-container"){
            const sourceDroppableId=parseInt(source.droppableId.split("-")[1],7);
            const sourceCategoryItems=question.categorize.items.filter((item)=>item.droppedAt===sourceDroppableId)
            const draggedItem=sourceCategoryItems[source.index]
            draggedItem.droppedAt=null
            setQuestions(questions)
        }
        else if( source.droppableId.startsWith("category-") && destination.droppableId.startsWith("category-")){
            const sourceDroppableId=parseInt(source.droppableId.split("-")[1],7);
            const sourceCategoryItems=question.categorize.items.filter((item)=>item.droppedAt===sourceDroppableId)
            const draggedItem=sourceCategoryItems[source.index]

            const destinationCategoryIndex=parseInt(destination.droppableId.split("-")[1], 7);

            draggedItem.droppedAt=destinationCategoryIndex
            setQuestions(questions)
        }
    }

    //I am setting the items droppedAt as null when the first time the preview page is loaded.
    //I am doing this because when the user is editing a form he will see all items at item-container when user is switching between preview mode and editedpreview mode. The changes made by user in preview mode will not reflect back in the editedpreviewmode.
    useEffect(()=>{
        const updatedQuestions = [...questions];
        const question = updatedQuestions[questionIndex];
        question.categorize.items.map((item)=>item.droppedAt=null)
        setQuestions(JSON.parse(JSON.stringify(questions)))
    },[])
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
                                            question.categorize.items.filter(item => item.droppedAt === index).map((item, index) => (
                                                <Draggable isDragDisabled={!isDragEnabled} key={`${item.name}-${index}`} draggableId={`${item.name}-${index}`} index={index}>
                                                    {(provided) => (
                                                        <span
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className='draggable-item-preview'>
                                                            {item.name}
                                                        </span>
                                                    )}
                                                </Draggable>

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
                            {question.categorize.items.filter((item)=>item.name.trim()).map((item, index) => (
                                <Draggable isDragDisabled={!isDragEnabled} key={`${item.name}-${index}`} draggableId={`${item.name}`} index={index}>
                                    {(provided) => (
                                        <div
                                            key={index}
                                            className={`draggable-item-preview ${item.droppedAt || item.droppedAt === 0 ? "hide" : ""} `}
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