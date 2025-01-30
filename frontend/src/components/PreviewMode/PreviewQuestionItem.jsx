import React from 'react'
import PreviewCategorizeQuestion from './PreviewCategorizeQuestion'
import PreviewClozeQuestion from './PreviewClozeQuestion'
import PreviewComprehensionQuestion from './PreviewComprehensionQuestion'

function PreviewQuestionItem({ question, questionIndex, isDragEnabled }) {
    return (
        <div className='bg-white shadow-lg p-4 rounded-lg flex flex-col gap-3 hover:shadow-xl transition-shadow'>
            <div className='flex items-center justify-between gap-2'>
                <h3 className='font-semibold font-sans text-blue-800'> Question {questionIndex + 1}</h3>
                <span className='border border-blue-500 text-blue-500 p-1 rounded'>{question.type}</span>
            </div>

            <div>
                {question.type == "categorize" && 
                    <PreviewCategorizeQuestion question={question} questionIndex={questionIndex} isDragEnabled={isDragEnabled}/>
                }
                {question.type == "cloze" && (
                    <PreviewClozeQuestion question={question} questionIndex={questionIndex} isDragEnabled={isDragEnabled}/>    
                )}
                {question.type == "comprehension" && (
                    <PreviewComprehensionQuestion question={question} questionIndex={questionIndex} isDragEnabled={isDragEnabled}/>    
                )}
            </div>
        </div>
    )
}

export default PreviewQuestionItem