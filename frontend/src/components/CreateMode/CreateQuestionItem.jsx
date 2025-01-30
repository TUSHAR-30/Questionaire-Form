import React, { useContext, useState } from 'react';
import SelectQuestionType from './SelectQuestionType';
import CreateCategorizeQuestion from './CreateCategorizeQuestion';
import CreateClozeQuestion from './CreateClozeQuestion';
import CreateComprehensionQuestion from './CreateComprehensionQuestion';
import { ChevronDown, ChevronRight, Trash2 } from 'lucide-react';
import CreateFormContext from '../../Context/CreateFormContext';
import { useLocation } from 'react-router-dom';
import EditFormContext from '../../Context/EditFormContext';

function CreateQuestionItem({ question, questionIndex }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const { questions, setQuestions } = currentPath == "/createform" ? useContext(CreateFormContext) : useContext(EditFormContext)
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleAccordion = () => {
        setIsExpanded((prev) => !prev);
    };

    const handleDeleteQuestion = (e) => {
        e.stopPropagation();
        const updatedQuestions = questions.filter((_, index) => index !== questionIndex);
        setQuestions(updatedQuestions);
    };

    return (
        <div className="bg-white rounded-lg  overflow-hidden shadow-[0_0_2px_#bbb]">
            <div 
                className="flex justify-between items-center cursor-pointer p-4 bg-blue-50 "
                onClick={toggleAccordion}
            >
                <h3 className='text-sm sm:text-lg font-medium text-blue-800 flex items-center gap-2'>
                    {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    Question {questionIndex + 1}
                </h3>
                <div className='flex items-center gap-4'>
                    <SelectQuestionType 
                        question={question} 
                        questionIndex={questionIndex} 
                        isExpanded={isExpanded} 
                        setIsExpanded={setIsExpanded} 
                    />
                    <button
                        onClick={handleDeleteQuestion}
                        className="text-gray-500 hover:text-red-500 transition-colors p-1"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="p-4">
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