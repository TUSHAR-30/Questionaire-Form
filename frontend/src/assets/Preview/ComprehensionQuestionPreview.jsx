import React from 'react'

function ComprehensionQuestionPreview({ question, questionIndex }) {
    return (
        <div className='comprehension-container-Preview'>
            <div className='description-container-Preview'>
                <div className='description-title-container-Preview'>
                    <span className='description-title-label-Preview'>Comprehension Title</span>
                    <p className='description-title-Preview'>{question.comprehension.description.title}</p>
                </div>
                <div className='description-content-container-Preview'>
                    <span className='description-content-label-Preview'>Comprehension Content</span>
                    <p className='description-content-Preview'>{question.comprehension.description.content}</p>
                </div>
            </div>
            <div className="questions-container-Preview">
                <span>Questions</span>
                {question.comprehension.questions.map((subquestion, subquestionIndex) => (
                    <div key={subquestionIndex} className='sub-question-container-Preview'>
                        <span className='sub-question-questionNumber-Preview'>Question {questionIndex + 1}.{subquestionIndex + 1}</span>
                        <div className='sub-question-Preview'>
                            <p>{subquestion.question}</p>
                            <div className='sub-question-options-container-Preview'>
                                {subquestion.options.map((option, optionIndex) => (
                                    <label key={optionIndex} className='sub-question-option-Preview'>
                                        <input
                                            type="radio"
                                            name={`comprehension-${questionIndex}-${subquestionIndex}`}
                                        />
                                        <p>{option.text}</p>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default ComprehensionQuestionPreview