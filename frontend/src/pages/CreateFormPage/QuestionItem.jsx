import React from 'react'
import SelectQuestionType from './SelectQuestionType';
import CategorizeQuestion from './CategorizeQuestion';
import ClozeQuestion from './ClozeQuestion';

function QuestionItem({ question, questionIndex }) {
    return (
        <div className="question-item">
            <h3>Question {questionIndex + 1}</h3>
            <SelectQuestionType question={question} questionIndex={questionIndex} />

            {question.type === 'cloze' && <ClozeQuestion question={question} questionIndex={questionIndex} />}
            {question.type === 'categorize' && <CategorizeQuestion question={question} questionIndex={questionIndex} />}
  
        </div>
    )
}

export default QuestionItem