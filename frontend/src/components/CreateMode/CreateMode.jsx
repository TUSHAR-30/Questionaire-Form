import React, { useContext } from 'react'
import CreateQuestionItem from './CreateQuestionItem';
import CreateFormContext from '../../Context/CreateFormContext';
import EditFormContext from '../../Context/EditFormContext';
import { useLocation } from 'react-router-dom';

function CreateMode() {
    const location = useLocation();
    const currentPath = location.pathname;
    const { questions, handleAddQuestion } =currentPath=="/createform"?useContext(CreateFormContext):useContext(EditFormContext)

    return (
        <div className="questions-list">
            {questions.map((question, questionIndex) => (
                <CreateQuestionItem key={questionIndex} question={question} questionIndex={questionIndex} />
            ))}
            <button className="add-question-btn" onClick={handleAddQuestion}>Add New Question</button>
        </div>
    )
}

export default CreateMode