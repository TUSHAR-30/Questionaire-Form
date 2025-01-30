import React, { useContext, useState } from 'react'
import EditFormContext from '../../Context/EditFormContext';
import CreateFormContext from '../../Context/CreateFormContext';
import { useLocation } from 'react-router-dom';

function PreviewComprehensionQuestion({ question, questionIndex }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const { questions, setQuestions } = currentPath === "/createform" ? useContext(CreateFormContext) : useContext(EditFormContext);

    const handleOptionSelection = (subquestionIndex, optionIndex) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].comprehension.questions[subquestionIndex].selectedOption = optionIndex;
        setQuestions(newQuestions);
    };

    return (
        <div className='flex flex-col gap-4'>
            <div className='bg-blue-50 p-4 rounded-lg shadow-sm'>
                <div className='flex flex-col gap-3'>
                    <div className='space-y-2'>
                        <h4 className='text-sm font-medium text-blue-800 text-center'>Comprehension Title</h4>
                        <p className='bg-white p-3 rounded-lg shadow-sm border border-blue-100 text-gray-800'>
                            {question.comprehension.description.title}
                        </p>
                    </div>
                    <div className='space-y-2'>
                        <h4 className='text-sm font-medium text-blue-800 text-center'>Comprehension Content</h4>
                        <div className='bg-white p-3 rounded-lg shadow-sm border border-blue-100 h-[120px] overflow-y-auto text-gray-700'>
                            {question.comprehension.description.content}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <h4 className='text-center text-blue-800 font-medium mb-3'>Questions</h4>
                <div className='space-y-4'>
                    {question.comprehension.questions.map((subquestion, subquestionIndex) => (
                        <div key={subquestionIndex} className='bg-white rounded-lg p-4 shadow-sm border border-blue-100'>
                            <div className='text-sm font-medium text-blue-800 mb-2'>
                                Question {questionIndex + 1}.{subquestionIndex + 1}
                            </div>
                            <p className='text-gray-700 mb-3'>{subquestion.question}</p>
                            <div className='space-y-2'>
                                {subquestion.options.map((option, optionIndex) => (
                                    <label 
                                        key={optionIndex} 
                                        className='flex items-center gap-3 p-2.5 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors'
                                    >
                                        <input
                                            type="radio"
                                            name={`comprehension-${questionIndex}-${subquestionIndex}`}
                                            onChange={() => handleOptionSelection(subquestionIndex, optionIndex)}
                                            className="w-4 h-4 text-blue-600 border-blue-300 focus:ring-blue-500"
                                        />
                                        <span className='text-gray-700 text-sm text-nowrap overflow-auto [&::-webkit-scrollbar]:h-0'>{option.text}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PreviewComprehensionQuestion