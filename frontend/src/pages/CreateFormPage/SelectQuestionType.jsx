import React, { useContext } from 'react'
import CreateFormContext from '../../Context/CreateFormContext';

function SelectQuestionType({ question, questionIndex }) {
    const { questions, setQuestions } = useContext(CreateFormContext)

    const handleQuestionTypeChange = (questionIndex, newType) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].type = newType;
        // Reset categories, items, and cloze data if the question type changes
        if (newType !== 'categorize') {
            newQuestions[questionIndex].categories = [];
            newQuestions[questionIndex].items = [];
            newQuestions[questionIndex].cloze = { questionText: '', blanks: [] };
        }
        setQuestions(newQuestions);
    };
    return (
        <label>
            Question Type:
            <select
                value={question.type}
                onChange={(e) =>
                    handleQuestionTypeChange(questionIndex, e.target.value)
                }
            >
                <option value="categorize">Categorize</option>
                <option value="cloze">Cloze</option>
            </select>
        </label>
    )
}

export default SelectQuestionType