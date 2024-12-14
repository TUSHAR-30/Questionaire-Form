import React, { useContext } from 'react'
import QuestionItem from './QuestionItem';
import CreateFormContext from '../../Context/CreateFormContext';

function QuestionsList() {
    const { questions } =useContext(CreateFormContext)

    return (
        <div className="questions-list">
            {questions.map((question, questionIndex) => (
                <QuestionItem key={questionIndex}  question={question} questionIndex={questionIndex} />
            ))}
        </div>
    )
}

export default QuestionsList