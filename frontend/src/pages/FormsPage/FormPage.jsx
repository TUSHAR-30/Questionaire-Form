import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuestionItem from '../CreateFormPage/QuestionItem';
import PreviewQuestionItem from '../../assets/Preview/PreviewQuestionItem';
import EditFormContext from '../../Context/EditFormContext';
import transformDataToBackendFormat from '../../utils';
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import FormMetaData from '../CreateFormPage/FormMetaData';
import { useAppContext } from "../../App";

function FormPage() {
    const { isAuthenticated, user} = useAppContext();
    const [isEditBtnClicked, setIsEditBtnClicked] = useState(false);
    const [isPreview, setIsPreview] = useState(false);
    const { questions, updatedQuestions, formTitle, updatedFormTitle, formDescription, updatedFormDescription, formId, formAuthorId ,setQuestions, setUpdatedQuestions, setFormTitle, setUpdatedFormTitle, setFormDescription, setUpdatedFormDescription } = useContext(EditFormContext)
    const [loading,setLoading]=useState(false)
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

    async function handleEditForm() {
        const transformedQuestions = transformDataToBackendFormat(questions, formTitle, formDescription)
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
        setLoading(true)
        try {
            const response = await axios.put(`${SERVER_URL}/form/${formId}`, formData, { withCredentials: true });
            console.log('Form submitted successfully:', response.data);
            setIsEditBtnClicked(false);
            setUpdatedQuestions(JSON.parse(JSON.stringify(questions)))
            setUpdatedFormTitle(formTitle);
            setUpdatedFormDescription(formDescription)
            alert("Form edited successfully")
        } catch (err) {
            console.log(err);
        } finally{
            setLoading(false)
        }
    }

    return (
        <div className="created-questions-list-Preview">
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner"></div>
                </div>
            )}
            {isEditBtnClicked ? (
                <>
                    <div className='saveAndCancel-container'>
                        <span onClick={handleEditForm}>Save Changes</span>
                        <span onClick={() => {
                            setQuestions(JSON.parse(JSON.stringify(updatedQuestions)));
                            setFormTitle(updatedFormTitle);
                            setFormDescription(updatedFormDescription);
                            setIsEditBtnClicked(false);
                        }}>Cancel</span>
                    </div>
                    <div className='createAndPreview-container'>
                        <span className={`${isPreview ? "" : "active"}`} onClick={() => setIsPreview(false)}>Create</span>
                        <span className={`${isPreview ? "active" : ""}`} onClick={() => setIsPreview(true)}>Preview</span>
                    </div>
                </>

            ) : (
                formAuthorId===user?._id && <div className='edit-form-btn-container'>
                    <span className='edit-form-btn' onClick={() => { setIsPreview(false); setIsEditBtnClicked(true) }}>Edit</span>
                </div>
            )}

            <FormMetaData formTitle={formTitle} setFormTitle={setFormTitle} formDescription={formDescription} setFormDescription={setFormDescription} isPreview={!isEditBtnClicked || (isEditBtnClicked && isPreview)} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '12px' }}>
                {questions?.map((question, questionIndex) => (
                    isEditBtnClicked ? (
                        isPreview ? (
                            <PreviewQuestionItem key={questionIndex} question={question} questionIndex={questionIndex} isDragEnabled={false} />

                        ) : (
                            <QuestionItem key={questionIndex} question={question} questionIndex={questionIndex} />
                        )

                    ) : (
                        <PreviewQuestionItem key={questionIndex} question={question} questionIndex={questionIndex} isDragEnabled={true} />
                    )
                ))}
                {isEditBtnClicked && !isPreview && <button style={{ alignSelf: 'flex-end' }} className="add-question-btn" onClick={handleAddQuestion}>Add New Question</button>}
            </div>

        </div>
    );
}

export default FormPage;
