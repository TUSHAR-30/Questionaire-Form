// import React from 'react'

// function ClozeQuestionPreview({ question }) {
//   return (
//     <div className='cloze-container-Preview'>
//         <p className='display-question-Preview'>{question.cloze.displayText}</p>
//         <div className='blanks-container-preview'>
//             {question.cloze.blanks.map((blank,index)=>(
//                 <span key={index} className='blank-preview'>{blank.text}</span>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default ClozeQuestionPreview






import React, { useContext, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import CreateFormContext from "../../Context/CreateFormContext";
import EditFormContext from "../../Context/EditFormContext";

function PreviewClozeQuestion({ question, questionIndex, isDragEnabled }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { questions, setQuestions } = currentPath === "/createform" ? useContext(CreateFormContext) : useContext(EditFormContext);

  //Util function to calculate index
  function findIndex(question, index) {
    return question.cloze.blanks.findIndex((blank) => (blank.droppedAt === index))
  }

  // Function to parse displayText and replace blanks with droppable placeholders
  const renderDisplayTextWithPlaceholders = () => {
    if (!question.cloze.displayText) return
    const parts = question.cloze.displayText.split("________");
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < question.cloze.blanks.length && (
          <Droppable droppableId={`placeholder-${index}`} >
            {(provided, snapshot) => (
              <span
                className={`placeholder inline-block w-[93px] h-5 bg-[#f0f0f0] leading-5 border border-dashed border-[#ccc] rounded-[5px] select-none ${snapshot.isDraggingOver ? "bg-[#e0e0e0] border border-[#888]" : ""} `}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {question.cloze.blanks[findIndex(question, index)]?.text ? (
                  <Draggable
                    isDragDisabled={!isDragEnabled}
                    draggableId={`placeholder-${index}`}
                    index={index}>
                    {
                      (provided) => (
                        <span
                          className={`  ${question.cloze.blanks[findIndex(question, index)]?.text ? "draggable-item-preview" : ""} `}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {question.cloze.blanks[findIndex(question, index)]?.text || "________"}
                        </span>
                      )
                    }
                  </Draggable>
                ) : (
                  <span>{"________"}</span>
                )}

                {provided.placeholder}

              </span>
            )}
          </Droppable>

        )}
      </span>
    ));
  };


  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;

    //move blank from blank-container to placeholder
    if (destination.droppableId.startsWith("placeholder-") && source.droppableId.startsWith("blanks-container")) {
      const placeholderIndex = parseInt(destination.droppableId.split("-")[1], 10);
      handleBlankDropped(source.index, placeholderIndex, questionIndex);
    }

    //move blank from placeholder to blank-container
    if (source.droppableId.startsWith("placeholder-") && destination.droppableId.startsWith("blanks-container")) {
      const updatedQuestions = [...questions];
      const question = updatedQuestions[questionIndex];
      const index = findIndex(question, source.index);
      if (index != -1) {
        question.cloze.blanks[index].droppedAt = null;
      }
      setQuestions(updatedQuestions);
    }

    //move placeholder blank to the placeholder blank
    if (source.droppableId.startsWith("placeholder-") && destination.droppableId.startsWith("placeholder-")) {
      const updatedQuestions = [...questions];
      const question = updatedQuestions[questionIndex];

      const draggedBlankIndex = findIndex(question, source.index);
      let draggedBlank;
      if (draggedBlankIndex != -1) {
        draggedBlank = question.cloze.blanks[draggedBlankIndex];
      }

      const destinationPlaceholderIndex = parseInt(destination.droppableId.split("-")[1], 10);
      const destinationBlankIndex = findIndex(question, destinationPlaceholderIndex);
      let destinationBlank;
      if (destinationBlankIndex != -1) {
        destinationBlank = question.cloze.blanks[destinationBlankIndex];
      }

      if (draggedBlank) draggedBlank.droppedAt = destinationPlaceholderIndex;
      if (destinationBlank) destinationBlank.droppedAt = source.index

      setQuestions(updatedQuestions);

    }

  };

  const handleBlankDropped = (sourceIndex, placeholderIndex, questionIndex) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    const sourceBlank = question.cloze.blanks[sourceIndex];

    //if the blank is already occupied , then remove it and add the new one
    const index = findIndex(question, placeholderIndex)
    if (index != -1) question.cloze.blanks[index].droppedAt = null;

    sourceBlank.droppedAt = placeholderIndex;

    // Update state with the new questions array
    setQuestions(updatedQuestions);
  };

  //I am setting the items droppedAt as null when the first time the preview page is loaded.
  //I am doing this because when the user is editing a form he will see all items at item-container when user is switching between preview mode and editedpreview mode. The changes made by user in preview mode will not reflect back in the editedpreviewmode.
  useEffect(() => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    question.cloze.blanks.map((blank) => blank.droppedAt = null)
    setQuestions(JSON.parse(JSON.stringify(questions)))
  }, [])

  return (
      <div className="flex flex-col gap-4">
        <DragDropContext onDragEnd={handleDragEnd}>
          <p className="text-[18px] relative leading-[1.5]">
            {renderDisplayTextWithPlaceholders()}
          </p>
          <div>
            <Droppable droppableId="blanks-container" direction="vertical">
              {(provided) => (
                <div
                  className="bg-[#edfcfc] flex flex-col gap-2 rounded p-1 h-40 overflow-y-auto "
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {question.cloze.blanks.map((blank, index) => (
                    <Draggable isDragDisabled={!isDragEnabled} key={blank.id} draggableId={blank.id} index={index}>
                      {(provided) => (
                        <span
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`draggable-item-preview ${(blank.droppedAt || blank.droppedAt === 0) ? "hidden" : ""}`}
                        >
                          {blank.text}
                        </span>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </div>

  );
}

export default PreviewClozeQuestion;

















