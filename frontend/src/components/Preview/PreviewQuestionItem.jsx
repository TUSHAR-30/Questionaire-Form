import React from 'react'
import CategorizeQuestionPreview from './CategorizeQuestionPreview'
import ClozeQuestionPreview from './ClozeQuestionPreview'
import ComprehensionQuestionPreview from './ComprehensionQuestionPreview'

function PreviewQuestionItem({ question, questionIndex , isDragEnabled }) {
    return (
        <div className='question-item-Preview'>
            <div className='item-header-Preview'>
                <h3> Question {questionIndex + 1}</h3>
                <span>{question.type}</span>
            </div>

            <div className='item-content-Preview'>
                {question.type == "categorize" && 
                    <CategorizeQuestionPreview question={question} questionIndex={questionIndex} isDragEnabled={isDragEnabled}/>
                }
                {question.type == "cloze" && (
                    <ClozeQuestionPreview question={question} questionIndex={questionIndex} isDragEnabled={isDragEnabled}/>    
                )}
                 {question.type == "comprehension" && (
                    <ComprehensionQuestionPreview question={question} questionIndex={questionIndex} isDragEnabled={isDragEnabled}/>    
                )}
            </div>

        </div>
    )
}

export default PreviewQuestionItem