import React, { useContext } from 'react'
import CreateFormContext from '../../Context/CreateFormContext';

function ClozeQuestion({ question, questionIndex }) {
    const { questions, setQuestions } = useContext(CreateFormContext)

    const handleClozeQuestionTextChange = (questionIndex, newText) => {
        const newQuestions = [...questions];
        newQuestions[questionIndex].cloze.questionText = newText;
        setQuestions(newQuestions);
    };

    const handleAddBlank = (questionIndex) => {
        const newQuestions = [...questions];
        const question = newQuestions[questionIndex];

        // Get the textarea DOM element
        const textarea = document.querySelector(`#cloze-textarea-${questionIndex}`);
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        // Ensure there's a valid selection
        if (start === end) {
            alert('Please select text to create a blank.');
            return;
        }

        // Check if the selected range overlaps with any existing blank
        const isOverlapping = question.cloze.blanks.some(
            (blank) =>
                (start >= blank.start && start < blank.end) || // Start is within an existing blank
                (end > blank.start && end <= blank.end) || // End is within an existing blank
                (start <= blank.start && end >= blank.end) // Selection fully encompasses an existing blank
        );

        if (isOverlapping) {
            alert('Selection overlaps with an existing blank. Please select a different portion.');
            return;
        }

        // Create the new blank
        const newBlank = {
            text: question.cloze.questionText.slice(start, end),
            start,
            end,
        };

        question.cloze.blanks.push(newBlank);
        question.cloze.questionText =
            question.cloze.questionText.slice(0, start) +
            '______' +
            question.cloze.questionText.slice(end);

        setQuestions(newQuestions);
    };

  return (
    <div className="question-cloze">
    <label>
        Question Text:
        <textarea
            id={`cloze-textarea-${questionIndex}`} // Unique ID for each question
            value={question.cloze.questionText}
            onChange={(e) =>
                handleClozeQuestionTextChange(questionIndex, e.target.value)
            }
            placeholder="Enter the question here. Select parts to fill in the blanks."
        />
    </label>
    <button
        className="add-blank-btn"
        onClick={() => {
            const selection = window.getSelection();
            if (selection.rangeCount) {
                const range = selection.getRangeAt(0);
                handleAddBlank(questionIndex, range.startOffset, range.endOffset);
            }
        }}
    >
        Add Blank
    </button>
    <h4>Blanks:</h4>
    <ul>
        {question.cloze.blanks.map((blank, index) => (
            <li key={index}>
                {blank.text} (Position: {blank.start} - {blank.end})
            </li>
        ))}
    </ul>
</div>
  )
}

export default ClozeQuestion