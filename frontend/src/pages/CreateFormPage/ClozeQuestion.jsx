// import React, { useContext, useEffect, useRef } from 'react';
// import CreateFormContext from '../../Context/CreateFormContext';

// function ClozeQuestion({ question, questionIndex }) {
//     const { questions, setQuestions } = useContext(CreateFormContext);
//     const textareaRef = useRef(null);

//     const handleClozeQuestionTextChange = (questionIndex, newText) => {
//         const newQuestions = [...questions];
//         newQuestions[questionIndex].cloze.originalText = newText;
//         newQuestions[questionIndex].cloze.displayText = newText; // Reset display text
//         newQuestions[questionIndex].cloze.blanks = []; // Clear blanks since text has changed
//         setQuestions(newQuestions);
//     };

//     const handleAddBlank = (questionIndex) => {
//         const newQuestions = [...questions];
//         const question = newQuestions[questionIndex];

//         const textarea = textareaRef.current;
//         if (!textarea) return;

//         const start = textarea.selectionStart;
//         const end = textarea.selectionEnd;

//         if (start === end) {
//             alert('Please select text to create a blank.');
//             return;
//         }

//         // Get selected text
//         const selectedText = question.cloze.originalText.slice(start, end);

//         // 1. Ensure only one word is selected
//         if (/\s/.test(selectedText)) {
//             alert('Please select only one word at a time.');
//             return;
//         }

//         // 2. Ensure the selected text is not part of a word
//         const beforeChar = question.cloze.originalText[start - 1];
//         const afterChar = question.cloze.originalText[end];

//         if ((beforeChar && !/\s/.test(beforeChar)) || (afterChar && !/\s/.test(afterChar))) {
//             alert('Please select a complete word, not part of a word.');
//             return;
//         }

//         // 3. Ensure the selected text is not empty or just spaces
//         if (selectedText.trim() === '' || /\s/.test(selectedText)) {
//             alert('Blank cannot include spaces. Please select a valid word.');
//             return;
//         }

//         // Ensure no overlapping blanks
//         const isOverlapping = question.cloze.blanks.some(
//             (blank) =>
//                 (start >= blank.start && start < blank.end) ||
//                 (end > blank.start && end <= blank.end) ||
//                 (start <= blank.start && end >= blank.end)
//         );

//         if (isOverlapping) {
//             alert('Selection overlaps with an existing blank. Please select a different portion.');
//             return;
//         }

//         const newBlank = {
//             text: selectedText,
//             start,
//             end,
//         };

//         question.cloze.blanks.push(newBlank);

//         // Assign blankSerialNumber based on `start` field
//         const blanksWithSerialNumbers = [...question.cloze.blanks]
//             .sort((a, b) => a.start - b.start)
//             .map((blank, index) => ({
//                 ...blank,
//                 blankSerialNumber: index + 1, // Add blankSerialNumber
//             }));

//         // Replace the original blanks with updated ones (preserving display order)
//         question.cloze.blanks = question.cloze.blanks.map((originalBlank) => {
//             const updatedBlank = blanksWithSerialNumbers.find(
//                 (blank) => blank.start === originalBlank.start && blank.end === originalBlank.end
//             );
//             return updatedBlank || originalBlank;
//         });

//         // Replace selected text with `_` in `displayText`
//         question.cloze.displayText =
//             question.cloze.displayText.slice(0, start) +
//             '_'.repeat(selectedText.length) +
//             question.cloze.displayText.slice(end);

//         setQuestions(newQuestions);
//     };

//     return (
//         <div className="question-cloze">
//             <label>
//                 Question Text:
//                 <textarea
//                     ref={textareaRef}
//                     id={`cloze-textarea-${questionIndex}`}
//                     value={question.cloze.originalText}
//                     onChange={(e) =>
//                         handleClozeQuestionTextChange(questionIndex, e.target.value)
//                     }
//                     placeholder="Enter the question here. Select parts to fill in the blanks."
//                 />
//             </label>
//             <button
//                 className="add-blank-btn"
//                 onClick={() => handleAddBlank(questionIndex)}
//             >
//                 Add Blank
//             </button>
//             <h4>Preview:</h4>
//             <p>{question.cloze.displayText}</p>
//             <h4>Blanks:</h4>
//             <div className='blanks-container'>
//                 {question.cloze.blanks.map((blank, index) => (
//                     <span key={index} className="draggable-blank">
//                         {blank.text} 
//                         {/* (Position: {blank.start} - {blank.end}) */}
//                     </span>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ClozeQuestion;





import React, { useContext, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import CreateFormContext from '../../Context/CreateFormContext';
import { useLocation } from 'react-router-dom';
import EditFormContext from '../../Context/EditFormContext';

function ClozeQuestion({ question, questionIndex }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const { questions, setQuestions } = currentPath == "/dragforms/createform" ? useContext(CreateFormContext) : useContext(EditFormContext)
    const textareaRef = useRef(null);
    const [isItemDragging,setisItemDragging]=useState(false)

    const onDragStart = (start) => {
        setisItemDragging(true);
      };

    const handleClozeQuestionTextChange = (questionIndex, newText) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].cloze.originalText = newText;
        newQuestions[questionIndex].cloze.displayText = newText; // Reset display text
        newQuestions[questionIndex].cloze.blanks = []; // Clear blanks since text has changed
        setQuestions(newQuestions);
    };

    const handleAddBlank = (questionIndex) => {
        const newQuestions = [...questions];
        const question = newQuestions[questionIndex];

        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (start === end) {
            alert('Please select text to create a blank.');
            return;
        }

        // Get selected text
        const selectedText = question.cloze.originalText.slice(start, end);

        // Validation checks
        if (/\s/.test(selectedText)) {
            alert('Please select only one word at a time.');
            return;
        }

        const beforeChar = question.cloze.originalText[start - 1];
        const afterChar = question.cloze.originalText[end];

        if ((beforeChar && !/\s/.test(beforeChar)) || (afterChar && !/\s/.test(afterChar))) {
            alert('Please select a complete word, not part of a word.');
            return;
        }

        // 3. Ensure the selected text is not empty or just spaces
        if (selectedText.trim() === '' || /\s/.test(selectedText)) {
            alert('Blank cannot include spaces. Please select a valid word.');
            return;
        }

        // Ensure no overlapping blanks
        const isOverlapping = question.cloze.blanks.some(
            (blank) =>
                (start >= blank.start && start < blank.end) ||
                (end > blank.start && end <= blank.end) ||
                (start <= blank.start && end >= blank.end)
        );

        if (isOverlapping) {
            alert('Selection overlaps with an existing blank. Please select a different portion.');
            return;
        }

        const newBlank = {
            id: `${Date.now()}-${Math.random()}`,
            text: selectedText,
            start,
            end,
        };

        question.cloze.blanks.push(newBlank);

        //  Assign blankSerialNumber based on `start` field
        const blanksWithSerialNumbers = [...question.cloze.blanks]
            .sort((a, b) => a.start - b.start)
            .map((blank, index) => ({
                ...blank,
                blankSerialNumber: index, // Add blankSerialNumber
            }));

        // Replace the original blanks with updated ones (preserving display order)
        question.cloze.blanks = question.cloze.blanks.map((originalBlank) => {
            const updatedBlank = blanksWithSerialNumbers.find(
                (blank) => blank.start === originalBlank.start && blank.end === originalBlank.end
            );
            return updatedBlank || originalBlank;
        });

        // Dynamically generate displayText from blanks
        question.cloze.displayText = generateDisplayText(
            question.cloze.originalText,
            question.cloze.blanks
        );

        setQuestions(newQuestions);
    };

    const handleDeleteBlank =(blankId)=>{
       const newQuestions = [...questions];
       const question = newQuestions[questionIndex];
       question.cloze.blanks=question.cloze.blanks.filter((blank,index)=>index!=blankId);

        // Dynamically generate displayText from blanks
        question.cloze.displayText = generateDisplayText(
            question.cloze.originalText,
            question.cloze.blanks
        );

        setQuestions(newQuestions);
    }

    // Function to generate displayText dynamically
    const generateDisplayText = (originalText, blankstemp) => {
        let displayText = '';
        let currentIndex = 0;
        let blanks = [...blankstemp]

        blanks.sort((a, b) => a.start - b.start).forEach((blank) => {
            // Add text before the blank
            displayText += originalText.slice(currentIndex, blank.start);
            // Add fixed underscores for the blank
            displayText += '________'; // Fixed size blank
            currentIndex = blank.end;
        });

        // Add remaining text after the last blank
        displayText += originalText.slice(currentIndex);

        return displayText;
    };

    const onDragEnd = (result) => {
        setisItemDragging(false);

        if (!result.destination) return;
        const newQuestions = [...questions];
        const blanks = Array.from(newQuestions[questionIndex].cloze.blanks);
        const [movedBlank] = blanks.splice(result.source.index, 1);
        blanks.splice(result.destination.index, 0, movedBlank);

        newQuestions[questionIndex].cloze.blanks = blanks;
        setQuestions(newQuestions);
    };

    return (
        <div className="question-cloze">
            <label>
                Question Text:
                <textarea
                    ref={textareaRef}
                    value={question.cloze.originalText}
                    onChange={(e) =>
                        handleClozeQuestionTextChange(questionIndex, e.target.value)
                    }
                    placeholder="Enter the question here. Select parts to fill in the blanks."
                />
            </label>
            <button className="add-blank-btn" onClick={() => handleAddBlank(questionIndex)}>
                Add Blank
            </button>
            <h4>Preview:</h4>
            <p>{question.cloze.displayText}</p>
            <h4>Blanks:</h4>
            <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <Droppable droppableId={`blanks-${questionIndex}`}>
                    {(provided) => (
                        <div
                            className={`blanks-container `}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >

                            {question.cloze.blanks.map((blank, index) => (
                                <div key={blank.id} style={{ display: "flex", gap: '40px', alignItems:"center" }}>
                                    <Draggable key={blank.id} draggableId={blank.id} index={index}>
                                        {(provided, snapshot) => (
                                            <>
                                                <div ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="draggable-blank"
                                                >
                                                    <span className="draggable-blank">
                                                        {blank.text}
                                                    </span>
                                                </div>
                                                <span 
                                                className={`deleteItembtn  ${isItemDragging?"hideDeletebtn":""} `} 
                                                onClick={()=>handleDeleteBlank(index)}
                                                >-</span>
                                            </>


                                        )}
                                    </Draggable>
                                </div>

                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default ClozeQuestion;
