import React, { useContext } from 'react';
import FormMetaData from './FormMetaData';
import QuestionsList from './QuestionsList';
import CreateFormContext from '../../Context/CreateFormContext';
import "./CreateFormPage.css";

const CreateFormPage = () => {
  const { questions, setQuestions } = useContext(CreateFormContext)

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: 'categorize', // Default to categorize
        categories: [],
        items: [],
        cloze: { questionText: '', blanks: [] }, // Initialize cloze data
      },
    ]);
  };

  return (
    <div className="create-form-container">
      <h2>Create New Form</h2>
      <FormMetaData />
      <QuestionsList />
      <button className="add-question-btn" onClick={handleAddQuestion}>Add New Question</button>
    </div>
  );
};

export default CreateFormPage;