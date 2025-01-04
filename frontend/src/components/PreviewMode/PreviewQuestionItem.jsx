import React from 'react'
import PreviewCategorizeQuestion from './PreviewCategorizeQuestion'
import PreviewClozeQuestion from './PreviewClozeQuestion'
import PreviewComprehensionQuestion from './PreviewComprehensionQuestion'

function PreviewQuestionItem({ question, questionIndex , isDragEnabled }) {
    return (
        <div className='question-item-Preview'>
            <div className='item-header-Preview'>
                <h3> Question {questionIndex + 1}</h3>
                <span>{question.type}</span>
            </div>

            <div className='item-content-Preview'>
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