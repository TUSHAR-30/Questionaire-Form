import React from 'react'
import PreviewClientResponseCategorizeQuestion from './PreviewClientResponseCategorizeQuestion'
import PreviewClientResponseClozeQuestion from './PreviewClientResponseClozeQuestion'
import PreviewClientResponseComprehensionQuestion from './PreviewClientResponseComprehensionQuestion'

function PreviewClientResponseQuestionItem({ question, questionIndex }) {
    return (
        <div className='bg-white p-4 rounded-lg flex flex-col gap-3'>
            <div className='flex gap-2 items-center justify-between'>
                <h3 className='font-semibold font-sans'> Question {questionIndex + 1}</h3>
                <span className='border border-black p-1 rounded'>{question.type}</span>
            </div>

            {question.type == "categorize" &&
                <PreviewClientResponseCategorizeQuestion question={question} questionIndex={questionIndex} />
            }
            {question.type == "cloze" && (
                <PreviewClientResponseClozeQuestion question={question} questionIndex={questionIndex} />
            )}
            {question.type == "comprehension" && (
                <PreviewClientResponseComprehensionQuestion question={question} questionIndex={questionIndex} />
            )}

        </div>
    )
}

export default PreviewClientResponseQuestionItem