// import React, { useContext, useState } from 'react';
// import CreateFormContext from '../../Context/CreateFormContext';
// import { BiSolidRightArrow } from "react-icons/bi";
// import { BiSolidDownArrow } from "react-icons/bi";

// function ComprehensionQuestion({ question, questionIndex }) {
//   const { questions, setQuestions } = useContext(CreateFormContext);
//   const [isComprehensionExpanded, setIsComprehensionExpanded] = useState(true);
//   const [isQuestionsExpanded, setIsQuestionsExpanded] = useState(true);

//   const toggleComprehensionAccordion = () => {
//     setIsComprehensionExpanded((prev) => !prev);
//   };

//   const toggleQuestionsAccordion = () => {
//     setIsQuestionsExpanded((prev) => !prev);
//   };

//   const handleDescriptionChange = (field, value) => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].comprehension.description[field] = value;
//     setQuestions(newQuestions);
//   };

//   const handleAddQuestion = () => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].comprehension.questions.push({ question: '', options: [], answer: '', newOption: '' });
//     setQuestions(newQuestions);
//   };

//   const handleQuestionChange = (qIndex, value) => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].comprehension.questions[qIndex].question = value;
//     setQuestions(newQuestions);
//   };

//   const handleAddOption = (qIndex) => {
//     const newQuestions = [...questions];
//     const optionToAdd = newQuestions[questionIndex].comprehension.questions[qIndex].newOption;
//     const trimmedOptionToAdd=optionToAdd.trim();

//     const duplicateOption=newQuestions[questionIndex].comprehension.questions[qIndex].options.find(option=>option==trimmedOptionToAdd)
//     if(duplicateOption){
//       alert("You cannot add duplicate options");
//       return;
//     }
//     if (trimmedOptionToAdd) {
//       newQuestions[questionIndex].comprehension.questions[qIndex].options.push(trimmedOptionToAdd);
//       newQuestions[questionIndex].comprehension.questions[qIndex].newOption = ''; // Clear the input field
//       setQuestions(newQuestions);
//     }
//   };

//   const handleOptionChange = (qIndex, value) => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].comprehension.questions[qIndex].newOption = value;
//     setQuestions(newQuestions);
//   };

//   const handleOptionSelection = (qIndex, option) => {
//     const newQuestions = [...questions];
//     newQuestions[questionIndex].comprehension.questions[qIndex].answer = option; // Set the selected option as the answer
//     setQuestions(newQuestions);
//   };

//   return (
//     <div className="comprehension-container">
//       <div className="comprehension-passage-container">
//         <h4 onClick={toggleComprehensionAccordion}>
//           <div className='comprehensiontoggle-arrow'>
//             {isComprehensionExpanded ?
//               <BiSolidDownArrow /> : <BiSolidRightArrow />
//             }
//           </div>
//           Comprehension
//         </h4>
//         {isComprehensionExpanded && (
//           <div className="comprehension-passage">
//             <label>
//               Title:
//               <input
//                 type="text"
//                 value={question.comprehension.description.title}
//                 onChange={(e) => handleDescriptionChange('title', e.target.value)}
//               />
//             </label>
//             <label>
//               Content:
//               <textarea
//                 value={question.comprehension.description.content}
//                 onChange={(e) => handleDescriptionChange('content', e.target.value)}
//               />
//             </label>
//           </div>
//         )}
//       </div>

//       <div className="comprehension-questions-container">
//         <h4 onClick={toggleQuestionsAccordion}>
//         <div className='comprehensiontoggle-arrow'>
//             {isQuestionsExpanded ?
//               <BiSolidDownArrow /> : <BiSolidRightArrow />
//             }
//           </div>
//           Questions
//         </h4>
//         {isQuestionsExpanded && (
//           <div className="comprehension-questions">
//             {question.comprehension.questions.map((q, qIndex) => (
//               <div key={qIndex} className="comprehension-question">
//                 <label>
//                   Question {questionIndex + 1}.{qIndex + 1}:
//                   <input
//                     type="text"
//                     value={q.question}
//                     placeholder='Write your question'
//                     onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
//                   />
//                 </label>
//                 <div className="add-option-container">
//                   <input
//                     type="text"
//                     value={q.newOption || ''}
//                     placeholder="Write your option"
//                     onChange={(e) => handleOptionChange(qIndex, e.target.value)}
//                   />
//                   <button
//                     className={`add-option-btn ${q.newOption?.trim() ? '' : 'disabled'}`}
//                     onClick={() => handleAddOption(qIndex)}
//                     disabled={!q.newOption?.trim()}
//                   >Add Option</button>

//                 </div>
//                 <div className="options-container">
//                   {q.options.map((option, oIndex) => (
//                     <label key={oIndex} className="option-label">
//                       <input
//                         type="radio"
//                         name={`question-${questionIndex}-${qIndex}`}
//                         checked={q.answer === option}
//                         onChange={() => handleOptionSelection(qIndex, option)}
//                       />
//                       <span>
//                       {option}

//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             ))}
//             <button className="add-comprehension-question-btn" onClick={handleAddQuestion}>
//               Add New Question
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ComprehensionQuestion;



import React, { useContext, useEffect, useState } from 'react';
import CreateFormContext from '../../Context/CreateFormContext';
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useLocation } from 'react-router-dom';
import EditFormContext from '../../Context/EditFormContext';

function CreateComprehensionQuestion({ question, questionIndex }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { questions, setQuestions } = currentPath == "/createform" ? useContext(CreateFormContext) : useContext(EditFormContext)
  const [isComprehensionExpanded, setIsComprehensionExpanded] = useState(true);
  const [isQuestionsExpanded, setIsQuestionsExpanded] = useState(true);

  const toggleComprehensionAccordion = () => {
    setIsComprehensionExpanded((prev) => !prev);
  };

  const toggleQuestionsAccordion = () => {
    setIsQuestionsExpanded((prev) => !prev);
  };

  const handleDescriptionChange = (field, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].comprehension.description[field] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].comprehension.questions.push({ question: '', options: [], answer: '', newOption: '' });
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].comprehension.questions[qIndex].question = value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (qIndex) => {
    const newQuestions = [...questions];
    const optionToAdd = newQuestions[questionIndex].comprehension.questions[qIndex].newOption;
    const trimmedOptionToAdd = optionToAdd.trim();

    // Check for duplicate option text
    const duplicateOption = newQuestions[questionIndex].comprehension.questions[qIndex].options.find(
      (option) => option.text === trimmedOptionToAdd
    );

    if (duplicateOption) {
      alert("You cannot add duplicate options");
      return;
    }

    if (trimmedOptionToAdd) {
      // Add option with unique id
      newQuestions[questionIndex].comprehension.questions[qIndex].options.push({
        id: `${Date.now()}-${Math.random()}`, // Unique ID
        text: trimmedOptionToAdd,
      });
      newQuestions[questionIndex].comprehension.questions[qIndex].newOption = ''; // Clear the input field
      setQuestions(newQuestions);
    }
  };


  const handleOptionChange = (qIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].comprehension.questions[qIndex].newOption = value;
    setQuestions(newQuestions);
  };

  const handleOptionSelection = (qIndex, option) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].comprehension.questions[qIndex].answer = option; // Set the selected option as the answer
    setQuestions(newQuestions);
  };

  const onDragEnd = (result, qIndex) => {
    const { source, destination } = result;

    // If the item was dropped outside the list
    if (!destination) return;

    // Get the items (options) for the specific question
    const newQuestions = [...questions];
    const items = newQuestions[questionIndex].comprehension.questions[qIndex].options;

    // Ensure the source and destination are different
    if (source.index === destination.index) return;

    // Reorder the options array by splicing the item out and inserting it at the destination index
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    // Update the state with the new order
    newQuestions[questionIndex].comprehension.questions[qIndex].options = items;
    setQuestions(newQuestions);
  };

  return (
    <div className="flex flex-col gap-5 rounded-lg overflow-hidden">
      <div className="bg-white rounded-lg">
        <h4 
          className='cursor-pointer flex items-center gap-2 p-4 bg-blue-50 border-b border-blue-100 text-blue-800 font-medium' 
          onClick={toggleComprehensionAccordion}
        >
          {isComprehensionExpanded ? <BiSolidDownArrow size={14} /> : <BiSolidRightArrow size={14} />}
          Comprehension Details
        </h4>
        {isComprehensionExpanded && (
          <div className="p-2 space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Title:
                <input
                  type="text"
                  value={question.comprehension.description.title}
                  onChange={(e) => handleDescriptionChange('title', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter comprehension title"
                />
              </label>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Content:
                <textarea
                  value={question.comprehension.description.content}
                  onChange={(e) => handleDescriptionChange('content', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 min-h-[120px]"
                  placeholder="Enter comprehension content"
                />
              </label>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-lg">
        <h4 
          className='cursor-pointer flex items-center gap-2 p-4 bg-blue-50 border-b border-blue-100 text-blue-800 font-medium'
          onClick={toggleQuestionsAccordion}
        >
          {isQuestionsExpanded ? <BiSolidDownArrow size={14} /> : <BiSolidRightArrow size={14} />}
          Questions
        </h4>
        {isQuestionsExpanded && (
          <div className="p-2">
            <div className="space-y-6">
              {question.comprehension.questions.map((q, qIndex) => (
                <div key={qIndex} className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-blue-800 mb-2">
                        Question {questionIndex + 1}.{qIndex + 1}:
                      </label>
                      <input
                        type="text"
                        value={q.question}
                        placeholder='Write your question'
                        onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={q.newOption || ''}
                        placeholder="Write your option"
                        onChange={(e) => handleOptionChange(qIndex, e.target.value)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      <button
                        className={`px-1 py-1 sm:px-2 sm:py-2 self-center  rounded-md text-white transition-colors ${
                          q.newOption?.trim() 
                            ? 'bg-[#4299E1] hover:bg-[#3182CE]' 
                            : 'bg-gray-300 cursor-not-allowed'
                        }`}
                        onClick={() => handleAddOption(qIndex)}
                        disabled={!q.newOption?.trim()}
                      >
                        Add Option
                      </button>
                    </div>

                    <DragDropContext onDragEnd={(result) => onDragEnd(result, qIndex)}>
                      <Droppable droppableId={`droppable-${qIndex}`} direction="vertical">
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="space-y-2"
                          >
                            {q.options.map((option, oIndex) => (
                              <Draggable key={option.id} draggableId={option.id} index={oIndex}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`flex items-center gap-3 p-3 bg-white rounded-lg border ${
                                      snapshot.isDragging ? 'border-blue-400 shadow-lg' : 'border-gray-200'
                                    }`}
                                  >
                                    <input
                                      type="radio"
                                      name={`question-${questionIndex}-${qIndex}`}
                                      checked={q.answer === option.text}
                                      onChange={() => handleOptionSelection(qIndex, option.text)}
                                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="flex-1 text-gray-700 text-nowrap overflow-auto [&::-webkit-scrollbar]:h-0">{option.text}</span>
                                    <div className="flex items-center gap-2">
                                      <div className="text-gray-400 cursor-move">⋮⋮</div>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              onClick={handleAddQuestion}
              className="mt-4 text-white bg-[#4299E1] hover:bg-[#3182CE] rounded px-2 py-1 transition-colors"
            >
              Add New Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateComprehensionQuestion;
