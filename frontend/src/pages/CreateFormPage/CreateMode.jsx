import React, { useContext } from 'react'
import CreateQuestionItem from './CreateQuestionItem';
import CreateFormContext from '../../Context/CreateFormContext';

function CreateMode() {
    const { questions } =useContext(CreateFormContext)

    return (
        <div className="questions-list">
            {questions.map((question, questionIndex) => (
                <CreateQuestionItem key={questionIndex}  question={question} questionIndex={questionIndex} />
            ))}
        </div>
    )
}

export default CreateMode