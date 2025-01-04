import React, { useContext } from 'react'
import "./PreviewMode.css"
import CreateFormContext from '../../Context/CreateFormContext'
import PreviewQuestionItem from './PreviewQuestionItem'

function PreviewMode() {
    const { questions } =useContext(CreateFormContext)

    return (
        <div className="questions-list-Preview">
            {questions.map((question, questionIndex) => (
                <PreviewQuestionItem key={questionIndex}  question={question} questionIndex={questionIndex}/>
            ))}
        </div>
    )
}

export default PreviewMode