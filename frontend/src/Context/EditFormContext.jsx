import React, { createContext, useEffect, useRef, useState } from 'react';
import transformDataToFrontendFormat from '../utils/transformDataToFrontendFormat';
import axios from 'axios';
import { SERVER_URL } from '../../config';
import { useParams } from 'react-router-dom';
import Error404Page from '../pages/Error404Page/Error404Page';
import { useAppContext } from '../App';

const EditFormContext = createContext();

export function EditFormProvider({ children }) {
    const { user } = useAppContext();
    const { formId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [formTitle, setFormTitle] = useState('');
    const [formDescription, setFormDescription] = useState('');
    const [questions, setQuestions] = useState([]);
    const [updatedQuestions, setUpdatedQuestions] = useState([]);
    const [updatedFormTitle, setUpdatedFormTitle] = useState('');
    const [updatedFormDescription, setUpdatedFormDescription] = useState('');
    const [formAuthorId, setFormAuthorId] = useState(null);
    const [formSubmissionUserEmail, setFormSubmissionUserEmail] = useState(null);
    const [continueWithSelectedEmail, setContinueWithSelectedEmail] = useState(false);
    const [isDuplicateRequestForFormSubmissionEmail, setIsDuplicateRequestForFormSubmissionEmail] = useState(null)

    const handleContinueBtnClick = () => {
        setContinueWithSelectedEmail(true);
    }

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
        async function fetchFormData() {
            let duplicateResponse, formResponse, questions;
            setLoading(true);
            try {
                const [authorResponse, emailResponse] = await Promise.all([
                    axios.get(`${SERVER_URL}/form/formAuthorId/${formId}`, { withCredentials: true }),
                    axios.get(`${SERVER_URL}/formSubmissionUserEmail`, { withCredentials: true }),
                ]);

                if (emailResponse.data.formSubmissionUserEmail) {
                    duplicateResponse = await axios.get(
                        `${SERVER_URL}/checkDuplicateFormSubmissionEmail/${formId}/${emailResponse.data.formSubmissionUserEmail}`,
                        { withCredentials: true }
                    );
                }

                if (continueWithSelectedEmail || (user._id && authorResponse.data === user?._id)) {
                    formResponse = await axios.get(`${SERVER_URL}/form/${formId}`, { withCredentials: true });
                    questions = transformDataToFrontendFormat(formResponse.data.questions);
                }

                setFormAuthorId(authorResponse.data);
                if (emailResponse.status == 200) {
                    setFormSubmissionUserEmail(emailResponse.data.formSubmissionUserEmail);
                }
                if (emailResponse.data.formSubmissionUserEmail) {
                    setIsDuplicateRequestForFormSubmissionEmail(duplicateResponse.data.isDuplicateRequest);
                }
                if (continueWithSelectedEmail || (user._id && authorResponse.data === user?._id)) {
                    setQuestions(questions);
                    setUpdatedQuestions(questions);
                    setFormTitle(formResponse.data.title);
                    setFormDescription(formResponse.data.description);
                    setUpdatedFormTitle(formResponse.data.title);
                    setUpdatedFormDescription(formResponse.data.description);
                }

            } catch (err) {
                console.error('Error during data fetching:', err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchFormData();
    }, [formId, user, continueWithSelectedEmail]);

    //Code for debugging

    // const initialRef = useRef(false)
    // console.log("editformcontext")
    // if (initialRef.current) {
    //     console.log('Loading state updated:', loading);
    //     console.log('Form Author ID updated:', formAuthorId);
    //     console.log('Form Submission User Email updated:', formSubmissionUserEmail);
    //     console.log('Continue With Selected Email updated:', continueWithSelectedEmail);
    //     console.log('Duplicate Request for Form Submission Email updated:', isDuplicateRequestForFormSubmissionEmail);
    //     console.log("Questions",questions);
    //     console.log("Questions",updatedQuestions);
    //     console.log("Form Title",formTitle);
    //     console.log("Updated Form Title",updatedFormTitle);
    //     console.log("form description",formDescription);
    //     console.log("Updated Form description",updatedFormDescription);
    // }
    // useEffect(() => {
    //     initialRef.current = true
    // }, [])


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
                formSubmissionUserEmail,
                continueWithSelectedEmail,
                isDuplicateRequestForFormSubmissionEmail,
                setQuestions,
                setUpdatedQuestions,
                setFormTitle,
                setUpdatedFormTitle,
                setFormDescription,
                setUpdatedFormDescription,
                handleAddQuestion,
                handleContinueBtnClick
            }}
        >
            {children}
        </EditFormContext.Provider>
    );
}


export default EditFormContext;