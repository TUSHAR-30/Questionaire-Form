import React, { useContext } from 'react';
import CreateFormContext from '../../Context/CreateFormContext';
import EditFormContext from '../../Context/EditFormContext';
import { useLocation } from 'react-router-dom';

function SelectQuestionType({ question, questionIndex , isExpanded, setIsExpanded }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { questions, setQuestions } =currentPath=="/createform"?useContext(CreateFormContext):useContext(EditFormContext)

    const handleQuestionTypeChange = (questionIndex, newType) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].type = newType;

        // Reset categories, items, and cloze data if the question type changes
        if (newType === 'categorize') {
            newQuestions[questionIndex].categorize = { categories: [], items: [] };
          } else if (newType === 'cloze') {
            newQuestions[questionIndex].cloze = { blanks: [] };
          } else if (newType === 'comprehension') {
            newQuestions[questionIndex].comprehension = {
              description: { title: '', content: '' },
              questions: [{ question: '', answer: '', options: [] }],
            };
          }
          
        setQuestions(newQuestions);
    };

    const handleSelectClick = (e) => {
        e.stopPropagation(); // Prevent event propagation when clicking the select
    };

    const handleSelectChange = (e) => {
        if(!isExpanded){
            setIsExpanded(true)
        }
        handleQuestionTypeChange(questionIndex, e.target.value);
    };

    return (
            <select
                className='w-full p-2 borer border-solid border-[#ccc] rounded'
                value={question.type}
                onClick={handleSelectClick} // Stop propagation on click
                onChange={handleSelectChange} // Allow propagation on value change
            >
                <option value="categorize">Categorize</option>
                <option value="cloze">Cloze</option>
                <option value="comprehension">Comprehension</option>
            </select>
    );
}

export default SelectQuestionType;
