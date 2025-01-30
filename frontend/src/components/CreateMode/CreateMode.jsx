import React, { useContext } from 'react'
import CreateQuestionItem from './CreateQuestionItem';
import CreateFormContext from '../../Context/CreateFormContext';
import EditFormContext from '../../Context/EditFormContext';
import { useLocation } from 'react-router-dom';
import { Plus } from 'lucide-react';

function CreateMode() {
    const location = useLocation();
    const currentPath = location.pathname;
    const { questions, handleAddQuestion } = currentPath == "/createform" ? useContext(CreateFormContext) : useContext(EditFormContext)

    return (
        <div className="space-y-6">
            {questions.map((question, questionIndex) => (
                <CreateQuestionItem key={questionIndex} question={question} questionIndex={questionIndex} />
            ))}
            <button 
                className=" py-2 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 justify-self-end" 
                onClick={handleAddQuestion}
            >
                <Plus size={20} />
                Add New Question
            </button>
        </div>
    )
}

export default CreateMode