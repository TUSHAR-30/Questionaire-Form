import React, { createContext, useEffect, useState } from 'react';
import transformDataToFrontendFormat from '../utils/transformDataToFrontendFormat';
import axios from 'axios';
import { SERVER_URL } from '../../config';
import { useParams } from 'react-router-dom';
import Error404Page from '../pages/Error404Page/Error404Page';

const EditFormContext = createContext();

// Create the provider component
export function EditFormProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false); // State for error handling
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [updatedQuestions, setUpdatedQuestions] = useState([]);
    const [updatedFormTitle, setUpdatedFormTitle] = useState('');
    const [updatedFormDescription, setUpdatedFormDescription] = useState('');
    const { formId } = useParams();
    const [formAuthorId, setFormAuthorId] = useState(null);

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

    useEffect(() => {
        async function getForm() {
            setLoading(true);
            try {
                const response = await axios.get(`${SERVER_URL}/form/${formId}`, { withCredentials: true });
                const questions = transformDataToFrontendFormat(response.data.questions);
                console.log(questions)
                const formAuthorId = response.data.userId;

                setFormAuthorId(formAuthorId);
                setQuestions(JSON.parse(JSON.stringify(questions)));
                setUpdatedQuestions(JSON.parse(JSON.stringify(questions)));
                setFormTitle(response.data.title);
                setFormDescription(response.data.description);
                setUpdatedFormTitle(response.data.title);
                setUpdatedFormDescription(response.data.description);
            } catch (err) {
                console.error(err);
                setError(true); // Set error state if an error occurs
            } finally {
                setLoading(false);
            }
        }

        getForm();
    }, [formId]);

    if (loading) {
        return (
            <div className="loading-overlay">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return <Error404Page />; // Render the 404 error page
    }

    return (
        <EditFormContext.Provider
            value={{
                questions,
                updatedQuestions,
                formTitle,
                updatedFormTitle,
                formDescription,
                updatedFormDescription,
                formId,
                formAuthorId,
                setQuestions,
                setUpdatedQuestions,
                setFormTitle,
                setUpdatedFormTitle,
                setFormDescription,
                setUpdatedFormDescription,
                handleAddQuestion
            }}
        >
            {children}
        </EditFormContext.Provider>
    );
}

export default EditFormContext;
