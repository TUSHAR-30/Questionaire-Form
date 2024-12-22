import React, { useContext, useState } from 'react';
import FormMetaData from './FormMetaData';
import QuestionsList from './QuestionsList';
import CreateFormContext from '../../Context/CreateFormContext';
import "./CreateFormPage.css";
import transformDataToBackendFormat from '../../utils';
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import Preview from '../../assets/Preview/Preview';

const CreateFormPage = () => {
  const { questions, setQuestions } = useContext(CreateFormContext)
  const [isPreview, setIsPreview] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: 'categorize', // Default question type
        categorize: { categories: [], items: [] }, // Nested under "categorize"
        cloze: { blanks: [] },
        comprehension: {
          description: { title: '', content: '' },
          questions: [{ question: '', answer: '', options: [] }],
        },
      },
    ]);
  };

  const handleSaveForm = async () => {
    const transformedQuestions = transformDataToBackendFormat(questions,formTitle,formDescription)
    // Check if all questions were filtered out (invalid input)
    if (transformedQuestions.length === 0) {
      alert('Form cannot be submitted. Please ensure all fields are valid.');
      return;
    }

    const formData = {
      title: formTitle,
      description: formDescription,
      questions: transformedQuestions,
      isDeployed: false,
    };

    try {
      const response = await axios.post(`${SERVER_URL}/form`, formData, { withCredentials: true });
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.log('Error submitting form:', error);
    }
  };

  return (
    <div className="create-form-container">
      <div className='saveAndDeploy-container'>
        <button onClick={handleSaveForm}>Save Form</button>
        <button>Save and Deploy</button>
      </div>
      <h2>Form</h2>

      <div className='createAndPreview-Toggle'>
        <button className={`${isPreview?"":"active"}`} onClick={()=>setIsPreview(false)}>Create</button>
        <button className={`${isPreview?"active":""}`} onClick={()=>setIsPreview(true)}>Preview</button>
      </div>
      <FormMetaData formTitle={formTitle} setFormTitle={setFormTitle} formDescription={formDescription} setFormDescription={setFormDescription} isPreview={isPreview}/>
      {isPreview ? (
        <Preview />
      ) : (
        <>
          <QuestionsList />
          <button className="add-question-btn" onClick={handleAddQuestion}>Add New Question</button>
        </>
      )
      }
    </div>
  );
};

export default CreateFormPage;