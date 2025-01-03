import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../../config';
import CreateFormContext from '../Context/CreateFormContext';
import transformDataToBackendFormat from '../utils/transformDataToBackendFormat';

const useCreateForm = () => {
  const navigate = useNavigate();
  const { questions, setQuestions } = useContext(CreateFormContext);
  const [isPreview, setIsPreview] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMode = (isPreview) =>{
    setIsPreview(isPreview)
  }

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        type: 'categorize', // Default question type
        categorize: { categories: [], items: [] },
        cloze: { blanks: [] },
        comprehension: {
          description: { title: '', content: '' },
          questions: [{ question: '', answer: '', options: [] }],
        },
      },
    ]);
  };

  const handleSaveForm = async () => {
    const transformedQuestions = transformDataToBackendFormat(
      questions,
      formTitle,
      formDescription
    );

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

    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}/form`, formData, {
        withCredentials: true,
      });
      alert('Form created successfully');
      navigate(`/form/${response.data._id}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    questions,
    isPreview,
    formTitle,
    formDescription,
    loading,
    handleAddQuestion,
    handleSaveForm,
    handleMode,
    setFormTitle,
    setFormDescription,
  };
};

export default useCreateForm;
