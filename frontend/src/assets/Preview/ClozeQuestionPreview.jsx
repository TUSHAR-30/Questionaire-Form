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






import React, { useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import CreateFormContext from "../../Context/CreateFormContext";
import EditFormContext from "../../Context/EditFormContext";

function ClozeQuestionPreview({ question, questionIndex }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { questions, setQuestions } =
    currentPath === "/dragforms/createform"
      ? useContext(CreateFormContext)
      : useContext(EditFormContext);

  // Function to parse displayText and replace blanks with droppable placeholders
  const renderDisplayTextWithPlaceholders = () => {
    const parts = question.cloze.displayText.split("________");
    console.log(question.cloze.blanks)
    return parts.map((part, index) => (
      <span key={index}>
        {part}
        {index < question.cloze.blanks.length && (
          <Droppable droppableId={`placeholder-${index}`}>
            {(provided, snapshot) => (
              <span
                className={`placeholder ${snapshot.isDraggingOver ? "placeholder-hover" : ""} 
                ${question.cloze.blanks[question.cloze.blanks.findIndex((blank)=>(blank.blankSerialNumber==index))].droppedText?"draggable-blank-preview":""} `}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {
                  question.cloze.blanks[question.cloze.blanks.findIndex((blank)=>(blank.blankSerialNumber==index))].droppedText || "________" 
                }
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
    if (destination.droppableId.startsWith("placeholder-")) {
      const placeholderIndex = parseInt(destination.droppableId.split("-")[1], 10);
      console.log(source);
      console.log(destination)
      handleBlankDropped(source.index, placeholderIndex, questionIndex);
    }
  };

  const handleBlankDropped = (sourceIndex, placeholderIndex, questionIndex) => {
    const updatedQuestions = [...questions];
    const question = updatedQuestions[questionIndex];
    const sourceBlank = question.cloze.blanks[sourceIndex];

    const destinationBlank=question.cloze.blanks.find((blank)=>(blank.blankSerialNumber==placeholderIndex))
    if(!destinationBlank.droppedText){
      destinationBlank.droppedText=sourceBlank.text
      question.cloze.blanks[sourceIndex].isDropped = true;
    }



    // Update state with the new questions array
    setQuestions(updatedQuestions);
  };

  return (
    <div className="cloze-container-preview">
      <DragDropContext onDragEnd={handleDragEnd}>
        <p className="display-question-preview">
          {renderDisplayTextWithPlaceholders()}
        </p>
        <div>
          <Droppable droppableId="blanks-container" direction="horizontal">
            {(provided) => (
              <div
                className="blanks-container-preview"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {question.cloze.blanks.map((blank, index) => (
                  <Draggable key={blank.id} draggableId={blank.id} index={index}>
                    {(provided) => (
                      <span
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`draggable-blank-preview ${blank.isDropped?"hide":""}`}
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

export default ClozeQuestionPreview;

















