import React, { useContext, useState } from 'react';
import SelectQuestionType from './SelectQuestionType';
import CreateCategorizeQuestion from './CreateCategorizeQuestion';
import CreateClozeQuestion from './CreateClozeQuestion';
import CreateComprehensionQuestion from './CreateComprehensionQuestion';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";
import CreateFormContext from '../../Context/CreateFormContext';
import { useLocation } from 'react-router-dom';
import EditFormContext from '../../Context/EditFormContext';

function CreateQuestionItem({ question, questionIndex }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const { questions, setQuestions } =currentPath=="/createform"?useContext(CreateFormContext):useContext(EditFormContext)
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleAccordion = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleDeleteQuestion = () => {
        const updatedQuestions = questions.filter((_, index) => index !== questionIndex);
        setQuestions(updatedQuestions);
    };

    return (
        <div className={`question-item ${isExpanded ? 'expanded' : 'collapsed'}`}>
            {/* Header with toggle button */}
            <div className="question-item-header" onClick={toggleAccordion}>
                <h3>
                    {isExpanded?<BiSolidDownArrow size={16}/>:<BiSolidRightArrow size={16}/>}
                    Question {questionIndex + 1}
                </h3>
                <div className='question-item-features'>
                    <SelectQuestionType question={question} questionIndex={questionIndex} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                    <MdOutlineDeleteOutline
                        size={24}
                        className='question-item-deleteBtn'
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent accordion toggle when delete is clicked
                            handleDeleteQuestion();
                        }}
                    />
                </div>
            </div>

            {/* Conditionally render the content based on expansion state */}
            {isExpanded && (
                <div className="question-item-content">
                    {question.type === 'cloze' && (
                        <CreateClozeQuestion question={question} questionIndex={questionIndex} />
                    )}
                    {question.type === 'categorize' && (
                        <CreateCategorizeQuestion question={question} questionIndex={questionIndex} />
                    )}
                    {question.type === 'comprehension' && (
                        <CreateComprehensionQuestion question={question} questionIndex={questionIndex} />
                    )}
                </div>
            )}
        </div>
    );
}

export default CreateQuestionItem;
