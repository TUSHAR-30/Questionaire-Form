import React, { useContext } from 'react'
import CreateFormContext from '../../Context/CreateFormContext'
import PreviewQuestionItem from './PreviewQuestionItem'
import { useLocation } from 'react-router-dom';
import EditFormContext from '../../Context/EditFormContext';
import "./PreviewMode.css"

function PreviewMode({ isDragEnabled }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const { questions } = currentPath == "/createform" ? useContext(CreateFormContext) : useContext(EditFormContext)

    return (
            <div className="questions-list-Preview">
                {questions.map((question, questionIndex) => (
                    <PreviewQuestionItem key={questionIndex} question={question} questionIndex={questionIndex} isDragEnabled={isDragEnabled} />
                ))}
            </div>
    )
}

export default PreviewMode